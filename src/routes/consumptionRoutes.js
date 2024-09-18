import { Router } from "express";
import {
    createConsumption,
    getAllConsumptions,
    getConsumption,
    updateConsumption,
    deleteConsumption,
  } from '../controllers/consumptionController.js';

const router = new Router();

router.post('/', createConsumption);
router.get('/', getAllConsumptions);
router.get('/:id', getConsumption);
router.put('/:id', updateConsumption);
router.delete('/:id', deleteConsumption);

export default router;