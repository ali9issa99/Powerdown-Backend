import { Consumption } from '../models/Consumption.js';


export const createConsumption = async (req, res) => {
    try {
      const { device_id, timeOn, energyUsage } = req.body;
      const newConsumption = new Consumption({
        device_id,
        timeOn,
        energyUsage,
      });
  
      await newConsumption.save();
      res.status(201).json(newConsumption);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  