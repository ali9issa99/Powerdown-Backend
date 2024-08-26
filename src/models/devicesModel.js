import mongoose, { Schema } from "mongoose";

const deviceSchema = new Schema ({
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

