import mongoose, { Schema } from "mongoose";

export const analyticsSchema = new Schema({
    date: { 
        type: Date,
        required: true 
        },
    totalUsage: { 
        type: Number,
        required: true 
        },
    averageConsumption: { 
        type: Number,
        required: true 
        },
  });
  
  export const Analytics = mongoose.model('Analytics', analyticsSchema);