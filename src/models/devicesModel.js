import mongoose, { Schema } from "mongoose";

const deviceSchema = new Schema ({
    device_id:{
        required: true,
        type: String,
        unique: true
    },

    deviceName: {
        required: true,
        type:String
    },

    room_id: {
        required:true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },

    status:{
        required:true,
        type: String,
        enum:['on','off']
    }
})

export const Device = mongoose.model('Device', deviceSchema);

