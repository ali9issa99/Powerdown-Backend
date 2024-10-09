import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
// import OpenAI from 'openai';
// Import Configuration and OpenAIApi from openai package
// import { Configuration, OpenAIApi } from 'openai';



import jwt from 'jsonwebtoken';
 // Ensure correct model import





// controllers/usersController.js

import { v4 as uuidv4 } from 'uuid';

export const createUser = async ({ name, email, password }) => {
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    // Create a default room with a unique room_id and a default device with a unique device_id
    const newUser = new User({
      name,
      email,
      password, // Store the plain password; it will be hashed in the pre-save hook
      rooms: [
        {
          room_id: uuidv4(),
          roomName: 'Default Room',
          devices: [
            {
              device_id: uuidv4(),
              deviceName: 'Default Device',
              status: 'off',
              consumption: [],
            },
          ],
        },
      ],
      analytics: [],
      aiSuggestions: [],
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    return savedUser;
  } catch (err) {
    console.error('Error creating user:', err);
    throw new Error('Error creating user: ' + err.message);
  }
};











// // Create User with embedded rooms, analytics, and AI suggestions
// export const createUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       rooms: [], // Initialize with an empty array of rooms
//       analytics: [], // Initialize with an empty array of analytics
//       aiSuggestions: [] // Initialize with an empty array of AI suggestions
//     });

//     await newUser.save();
//     res.status(201).json({
//       _id: newUser._id,
//       name: newUser.name,
//       email: newUser.email,
//       token: generateToken(newUser._id),
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Get a User by ID (with embedded rooms, analytics, and AI suggestions)
export const getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users (with embedded rooms, analytics, and AI suggestions)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User (with embedded rooms, analytics, and AI suggestions)
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete User (with embedded rooms, analytics, and AI suggestions)
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    console.error('Error fetching user by email:', err); // Log the full error object
    throw new Error('Error fetching user by email');
  }
};








// Add or Modify Room Data within a User
export const modifyUserRooms = async (req, res) => {
  const { action, data } = req.body;
  const { roomName, deviceName } = data;
  const userId = req.params.id;

  try {
    let update;
    let arrayFilters = [];

    if (action === "addRoom") {
      const newRoom = { roomName, devices: [] };
      update = { $push: { rooms: newRoom } };
    } else if (action === "addDevice") {
      const newDevice = { deviceName, status: "off", consumption: [] };
      update = {
        $push: {
          "rooms.$[room].devices": newDevice,
        },
      };
      arrayFilters.push({ "room.roomName": roomName });
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const updateOptions = {
      new: true,
      ...(arrayFilters.length > 0 && { arrayFilters }),
    };

    const updatedUser = await User.findByIdAndUpdate(userId, update, updateOptions);

    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







// Add or Modify Analytics Data within a User
export const modifyUserAnalytics = async (req, res) => {
  const { action, data } = req.body;

  // Ensure data is defined
  if (!data) {
    return res.status(400).json({ message: "Data is required" });
  }

  const { date, totalUsage, averageConsumption } = data;
  const userId = req.params.id;

  try {
    let update;

    if (action === "addAnalytics") {
      const newAnalytics = { date, totalUsage, averageConsumption };
      update = { $push: { analytics: newAnalytics } };
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const updateOptions = {
      new: true,
    };

    const updatedUser = await User.findByIdAndUpdate(userId, update, updateOptions);

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};








import OpenAI from 'openai';

export const getUserAiSuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ aiSuggestions: user.aiSuggestions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch AI suggestions', error: error.message });
  }
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key',
});

export const modifyUserAiSuggestions = async (req, res) => {
  const { action, data } = req.body;
  const userId = req.params.id;

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let houseDetails = data?.houseDetails || user.houseDetails || 'a standard household';

    if (action === 'add' || user.aiSuggestions.length === 0) {
      try {
        const openaiResponse = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are an expert in energy consumption optimization.' },
            { role: 'user', content: `Provide 3 suggestions to optimize energy consumption for the following house details: ${houseDetails}` },
          ],
          max_tokens: 200,
        });

        const aiGeneratedSuggestions = openaiResponse.choices[0]?.message?.content || 'No suggestions available.';

        const newAiSuggestion = { suggestions: aiGeneratedSuggestions };

        await User.findByIdAndUpdate(
          userId,
          { $push: { aiSuggestions: newAiSuggestion } },
          { new: true }
        );

        user = await User.findById(userId);
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json({ message: `Failed to get suggestions from OpenAI: ${error.message}` });
      }
    }

    res.status(200).json(user);  
  } catch (error) {
    console.error('Error in modifyUserAiSuggestions:', error);
    res.status(500).json({ error: error.message });
  }
};
