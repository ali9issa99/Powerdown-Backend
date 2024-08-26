import { Router } from "express";
import {
    createConsumption,
    getAllConsumptions,
    getConsumption,
    updateConsumption,
    deleteConsumption,
  } from '../controllers/consumptionController.js';

const router = new Router();

router.post('/consumptions', createConsumption);
router.get('/consumptions', getAllConsumptions);
router.get('/consumptions/:id', getConsumption);
router.put('/consumptions/:id', updateConsumption);
router.delete('/consumptions/:id', deleteConsumption);

export default router;