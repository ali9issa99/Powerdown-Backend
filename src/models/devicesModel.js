import mongoose, { Schema } from "mongoose";

const deviceSchema = new Schema({
    device_id: { 
        type: String,
        required: true,
        unique: true 
        },
    deviceName: { 
        type: String,
        required: true 
        },
    room_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true 
        },
    status: { 
        type: String, 
        enum: ["on", "off"],
        required: true
        },
  });

export const Device = mongoose.model('Device', deviceSchema);