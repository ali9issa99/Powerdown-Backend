import { Consumption } from '../models/consumptionModel.js';


export const createConsumption = async (req, res) => {
    try {
      const { timeOn, energyUsage } = req.body;
      const newConsumption = new Consumption({
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


  export const getAllConsumptions = async (req, res) => {
    try {
      const consumptions = await Consumption.find({});
      res.status(200).json(consumptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  export const updateConsumption = async (req, res) => {
    try {
      const updatedConsumption = await Consumption.findByIdAndUpdate(
        req.params.id,
        {
          device_id: req.body.device_id,
          timeOn: req.body.timeOn,
          energyUsage: req.body.energyUsage,
        },
        { new: true }
      );
  
      if (!updatedConsumption) return res.status(404).json({ message: 'Consumption not found' });
      res.status(200).json(updatedConsumption);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const deleteConsumption = async (req, res) => {
    try {
      const deletedConsumption = await Consumption.findByIdAndDelete(req.params.id);
      if (!deletedConsumption) return res.status(404).json({ message: 'Consumption not found' });
      res.status(200).json({ message: 'Consumption deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };