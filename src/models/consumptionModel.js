import mongoose, { Schema } from "mongoose";

const consumptionSchema = new Schema({
    device_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true
        },
    timeOn: { 
        type: Date,
        required: true
        },
    energyUsage: { 
        type: Number,
        required: true 
        },
  });
  
export const Consumption = mongoose.model('Consumption', consumptionSchema);