import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

// Create User with embedded rooms, analytics, and AI suggestions
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
      rooms: [], // Initialize with an empty array of rooms
      analytics: [], // Initialize with an empty array of analytics
      aiSuggestions: [] // Initialize with an empty array of AI suggestions
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
          "rooms.$[room].devices": newDevice
        }
      };
      arrayFilters.push({ "room.roomName": roomName });
    } else if (action === "addConsumption") {
      update = {
        $push: {
          "rooms.$[room].devices.$[device].consumption": consumption
        }
      };
      arrayFilters.push({ "room.roomName": roomName }, { "device.deviceName": deviceName });
    } else if (action === "removeDevice") {
      update = {
        $pull: {
          "rooms.$[room].devices": { deviceName }
        }
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

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
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



// Add or Modify AI Suggestions within a User
export const modifyUserAiSuggestions = async (req, res) => {
  const { action, data } = req.body;
  const { suggestions } = data;
  const userId = req.params.id;

  try {
    let update;

    if (action === "add") {
      const newAiSuggestion = { suggestions };
      update = { $push: { aiSuggestions: newAiSuggestion } };
    } else if (action === "update") {
      update = {
        $set: {
          "aiSuggestions.$[elem].suggestions": suggestions
        }
      };
    } else if (action === "remove") {
      update = { $pull: { aiSuggestions: { suggestions } } };
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      {
        new: true,
        arrayFilters: action === "update" ? [{ "elem.suggestions": suggestions }] : []
      }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in modifyUserAiSuggestions:", error);  // Log error to server console
    res.status(500).json({ error: error.message });
  }
};
