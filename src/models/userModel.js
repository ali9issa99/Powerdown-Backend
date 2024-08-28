// import mongoose, { Schema } from "mongoose";

// const userschema = new Schema({
//     name: {
//         required: true,
//         type: String,
//     },
//     email: {
//         required: true,
//         type:String,
//         unique:true
//     },
//     password: {
//         required: true,
//         type:String
//     }
// });

// export const User = mongoose.model("User", userschema)


import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';

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
    }
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
