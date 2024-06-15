import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

    const existedUser = User.findOne({
        $or: [{email}, {username}]
    });

    if(existedUser){
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath = req.files?.coverImage[0]?.path;

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

    const createdUser = User.findById(user._id).select("-password -refreshToken"); // remove password and refresh token from the response

    if(!createdUser){
        throw new ApiError(500, "Error creating user");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };