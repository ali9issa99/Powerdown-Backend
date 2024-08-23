import { User } from "../models/userModel";


export const createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = new User({
        name,
        email,
        password,
      });
  
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


