import mongoose, { Schema } from "mongoose";

export const aiSuggestionSchema = new Schema({
    suggestions: {
        type: String,
        required: true },
  });
  
export const AiSuggestion = mongoose.model('AiSuggestion', aiSuggestionSchema);