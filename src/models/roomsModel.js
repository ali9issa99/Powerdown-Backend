import mongoose, { Schema } from "mongoose";
// import { deviceSchema } from "./devicesModel.js";
import { consumptionSchema } from "./consumptionModel.js";


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
    devices: [{
        deviceName: { type: String, required: true },
        status: { type: String, enum: ['on', 'off'], default: 'off' },
        consumption: [consumptionSchema]
      }] // Embedding Device
});
  
  export const Room = mongoose.model('Room', roomSchema);