import { Router } from "express";
import {
    createAnalytics,
    getAllAnalytics,
    getAnalytics,
    updateAnalytics,
    deleteAnalytics,
  } from '../controllers/analyticsController.js';

const router = new Router();

router.post('/', createAnalytics);
router.get('/', getAllAnalytics);
router.get('/:id', getAnalytics);
router.put('/:id', updateAnalytics);
router.delete('/:id', deleteAnalytics);

export default router;