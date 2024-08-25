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