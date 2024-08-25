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


  export const updateAnalytics = async (req, res) => {
    try {
      const updatedAnalytics = await Analytics.findByIdAndUpdate(
        req.params.id,
        {
          user_id: req.body.user_id,
          date: req.body.date,
          totalUsage: req.body.totalUsage,
          averageConsumption: req.body.averageConsumption,
        },
        { new: true }
      );
  
      if (!updatedAnalytics) return res.status(404).json({ message: 'Analytics not found' });
      res.status(200).json(updatedAnalytics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const deleteAnalytics = async (req, res) => {
    try {
      const deletedAnalytics = await Analytics.findByIdAndDelete(req.params.id);
      if (!deletedAnalytics) return res.status(404).json({ message: 'Analytics not found' });
      res.status(200).json({ message: 'Analytics deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };