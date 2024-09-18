import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import { roomSchema } from './roomsModel.js'; // Import the Room schema
import { analyticsSchema } from './analyticsModel.js'; // Import the Analytics schema
import { aiSuggestionSchema } from './AiSuggestionsModel.js'; // Import the AiSuggestion schema

// User schema with embedded Rooms, Analytics, and AiSuggestions
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
    ], // Embedding Analytics schema
    aiSuggestions: [
        aiSuggestionSchema
    ] // Embedding AiSuggestion schema
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
