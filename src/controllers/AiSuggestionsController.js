import AiSuggestion from '../models/AiSuggestion.js';

export const createAiSuggestion = async (req, res) => {
    try {
      const { user_id, suggestions } = req.body;
      const newAiSuggestion = new AiSuggestion({
        user_id,
        suggestions,
      });
  
      await newAiSuggestion.save();
      res.status(201).json(newAiSuggestion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };