import mongoose, { Schema } from "mongoose";

const aiSuggestionSchema = new Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true },
    suggestions: {
        type: String,
        required: true },
  });
  
export const AiSuggestion = mongoose.model('AiSuggestion', aiSuggestionSchema);