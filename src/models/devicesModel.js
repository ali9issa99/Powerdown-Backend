import mongoose, { Schema } from "mongoose";
import { consumptionSchema } from "./consumptionModel.js";

export const deviceSchema = new Schema({
    device_id: { 
        type: String,
        required: true,
        unique: true 
    },
    deviceName: { 
        type: String,
        required: true 
    },
    status: { 
        type: String, 
        enum: ["on", "off"],
        required: true
    },
    consumptions: [consumptionSchema] // Embedding Consumption // Embedding Consumption
});

export const Device = mongoose.model('Device', deviceSchema);