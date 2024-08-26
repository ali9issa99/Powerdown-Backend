import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
    roomName: {
        type: String,
        required: true 
    },
    devices: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }],
  });
  
  export const Room = mongoose.model('Room', roomSchema);