import Analytics from '../models/Analytics.js';

export const createAnalytics = async (req, res) => {
    try {
      const { user_id, date, totalUsage, averageConsumption } = req.body;
      const newAnalytics = new Analytics({
        user_id,
        date,
        totalUsage,
        averageConsumption,
      });
  
      await newAnalytics.save();
      res.status(201).json(newAnalytics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const getAnalytics = async (req, res) => {
    try {
      const analytics = await Analytics.findById(req.params.id);
      if (!analytics) return res.status(404).json({ message: 'Analytics not found' });
      res.status(200).json(analytics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const getAllAnalytics = async (req, res) => {
    try {
      const analytics = await Analytics.find({});
      res.status(200).json(analytics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  