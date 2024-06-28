import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "Error generating tokens");
    }
}

const registerUser = asyncHandler(async (req, res) => {
  // Register user
  // get user data from frontend
  // validation- not empty
  // check if user already exists: email, username
  // check for images. check for avatar
  // upload images to cloudinary
  // create user object - create entry in the database
  // remove password and refresh token from the response
  // check for user creation
  // return response
  
    const {fullName, email, username, password} = req.body;

    console.log(fullName, email, username, password);

    if([fullName, email, username, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "Please fill all the fields");
    }

    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    });

    if(existedUser){
        throw new ApiError(409, "User already exists");
    }

    console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;

    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){
        throw new ApiError(400, "Please upload an avatar");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath, (avatarPublicId) => {
        console.log(avatarPublicId);
    });

    const coverImage = await uploadOnCloudinary(coverImageLocalPath, (coverImagePublicId) => {
        console.log(coverImagePublicId);
    });

    if(!avatar) {
        throw new ApiError(400, "Error uploading avatar");
    }

    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken"); // remove password and refresh token from the response

    if(!createdUser){
        throw new ApiError(500, "Error creating user");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email 
    // find the user
    // password check
    // access and refresh token
    // send cookies

    const {email, username, password} = req.body;

    if(!username || !email){
        throw new ApiError(400, "Please provide username or email");
    }

    const user = await User.findOne({
        $or: [{email}, {username}]
    })

    if(!user){
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid password");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken"); // remove password and refresh token from the response

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {
            user: loggedInUser,
            accessToken,
            refreshToken
        }, 
        "User logged in successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    // clear cookies
    // remove refresh token from the database

    await User.findByIdAndUpdate(req.user._id, {
        $set: {refreshToken: undefined}
    });

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };