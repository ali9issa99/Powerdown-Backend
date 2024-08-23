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