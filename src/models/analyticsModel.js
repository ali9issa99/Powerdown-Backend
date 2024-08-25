import mongoose, { Schema } from "mongoose";

const analyticsSchema = new Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
        },
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