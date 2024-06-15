import mongoose, {Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        trim: true,
        index: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        trim: true,
    },

    fullname: {
        type: String,
        required: true,
        trim: true, // remove white space
        index: true
    },

    avatar: {
        type: String, // cloudinary url
        required: true,
    },

    coverImage: {
        type: String, 
    },

    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    refreshTokens: {
        type: String,
    },
}, {timestamps: true});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        emil: this.email,
        username: this.username,
        fullname: this.fullname,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,
    },
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model('User', userSchema);