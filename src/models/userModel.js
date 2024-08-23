import mongoose, { Schema } from "mongoose";

const userschema = new Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type:String,
        unique:true
    },
    password: {
        required: true,
        type:String
    }
});

export const User = mongoose.model("User", userschema)