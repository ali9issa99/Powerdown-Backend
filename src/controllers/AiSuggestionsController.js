import { AiSuggestion } from "../models/AiSuggestionsModel.js";

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


export const getAiSuggestion = async (req, res) => {
    try {
      const aiSuggestion = await AiSuggestion.findById(req.params.id);
      if (!aiSuggestion) return res.status(404).json({ message: 'AI Suggestion not found' });
      res.status(200).json(aiSuggestion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const getAllAiSuggestions = async (req, res) => {
    try {
      const aiSuggestions = await AiSuggestion.find({});
      res.status(200).json(aiSuggestions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const updateAiSuggestion = async (req, res) => {
    try {
      const updatedAiSuggestion = await AiSuggestion.findByIdAndUpdate(
        req.params.id,
        {
          user_id: req.body.user_id,
          suggestions: req.body.suggestions,
        },
        { new: true }
      );
  
      if (!updatedAiSuggestion) return res.status(404).json({ message: 'AI Suggestion not found' });
      res.status(200).json(updatedAiSuggestion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const deleteAiSuggestion = async (req, res) => {
    try {
      const deletedAiSuggestion = await AiSuggestion.findByIdAndDelete(req.params.id);
      if (!deletedAiSuggestion) return res.status(404).json({ message: 'AI Suggestion not found' });
      res.status(200).json({ message: 'AI Suggestion deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };