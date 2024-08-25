import { Router } from "express";
import {
    createAiSuggestion,
    getAllAiSuggestions,
    getAiSuggestion,
    updateAiSuggestion,
    deleteAiSuggestion,
  } from '../controllers/AiSuggestionsController.js';

  const router = new Router();


router.post('/', createAiSuggestion);
router.get('/', getAllAiSuggestions);
router.get('/:id', getAiSuggestion);
router.put('/:id', updateAiSuggestion);
router.delete('/:id', deleteAiSuggestion);

export default router;

