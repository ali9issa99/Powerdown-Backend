// import { User } from "../models/userModel.js";


// export const createUser = async (req, res) => {
//     try {
//       const { name, email, password } = req.body;
//       const newUser = new User({
//         name,
//         email,
//         password,
//       });
  
//       await newUser.save();
//       res.status(201).json(newUser);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };


// export const getUsers = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// export const updateUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         updatedAt: Date.now(),
//       },
//       { new: true }
//     );

//     if (!updatedUser) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// export const deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) return res.status(404).json({ message: 'User not found' });
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};