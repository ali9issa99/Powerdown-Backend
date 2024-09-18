import mongoose, { Schema } from "mongoose";

export const consumptionSchema = new Schema({
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