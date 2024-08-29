// import mongoose, { Schema } from "mongoose";
// import bcrypt from 'bcryptjs';

// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     }
// }, { timestamps: true });

// // Hash password before saving the user model
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // Method to match password during login
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// export const User = mongoose.model("User", userSchema);

import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import { roomSchema } from './roomsModel.js'; // Import the Room schema
import { analyticsSchema } from './analyticsModel.js'; // Import the Analytics schema

// User schema with embedded Rooms and Analytics
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rooms: [
        roomSchema
    ], // Embedding Room schema
    analytics: [
        analyticsSchema
    ] // Embedding Analytics schema
}, { timestamps: true });

// Hash password before saving the user model
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to match password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
