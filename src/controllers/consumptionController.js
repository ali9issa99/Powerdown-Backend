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


  export const getConsumption = async (req, res) => {
    try {
      const consumption = await Consumption.findById(req.params.id);
      if (!consumption) return res.status(404).json({ message: 'Consumption not found' });
      res.status(200).json(consumption);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  