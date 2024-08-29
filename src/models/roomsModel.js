import mongoose, { Schema } from "mongoose";
import { deviceSchema } from "./devicesModel.js";


export const roomSchema = new Schema({
    room_id: {
        type: String,
        required: true,
        unique: true 
    },
    roomName: {
        type: String,
        required: true 
    },
    devices: [deviceSchema] // Embedding Device
});
  
  export const Room = mongoose.model('Room', roomSchema);