import { lowerCase } from 'lodash';

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    // userName: String,
    // email: String,
    // isActive: Boolean,
    // superpower of mongoose
    username: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
}, {timestamps: true})

export const User = mongoose.model('User', userSchema);
// "User" converts to "users" collection in the database