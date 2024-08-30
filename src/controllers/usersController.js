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
  const { userId, action, data } = req.body; // action could be "add", "update", "remove"
  const { roomId, roomName } = data; // data related to room

  try {
    let update;

    if (action === "add") {
      const newRoom = { room_id: roomId, roomName, devices: [] };
      update = { $push: { rooms: newRoom } };
    } else if (action === "update") {
      update = {
        $set: {
          "rooms.$[elem].roomName": roomName
        }
      };
    } else if (action === "remove") {
      update = { $pull: { rooms: { _id: roomId } } };
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      {
        new: true,
        arrayFilters: action === "update" ? [{ "elem._id": roomId }] : []
      }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add or Modify Analytics Data within a User
export const modifyUserAnalytics = async (req, res) => {
  const { userId, action, data } = req.body; // action could be "add", "update", "remove"
  const { analyticsId, date, totalUsage, averageConsumption } = data; // data related to analytics

  try {
    let update;

    if (action === "add") {
      const newAnalytics = { _id: analyticsId, date, totalUsage, averageConsumption };
      update = { $push: { analytics: newAnalytics } };
    } else if (action === "update") {
      update = {
        $set: {
          "analytics.$[elem].date": date,
          "analytics.$[elem].totalUsage": totalUsage,
          "analytics.$[elem].averageConsumption": averageConsumption
        }
      };
    } else if (action === "remove") {
      update = { $pull: { analytics: { _id: analyticsId } } };
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      {
        new: true,
        arrayFilters: action === "update" ? [{ "elem._id": analyticsId }] : []
      }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add or Modify AI Suggestions within a User
export const modifyUserAiSuggestions = async (req, res) => {
  const { userId, action, data } = req.body; // action could be "add", "update", "remove"
  const { aiSuggestionId, suggestions } = data; // data related to AI suggestions

  try {
    let update;

    if (action === "add") {
      const newAiSuggestion = { _id: aiSuggestionId, suggestions };
      update = { $push: { aiSuggestions: newAiSuggestion } };
    } else if (action === "update") {
      update = {
        $set: {
          "aiSuggestions.$[elem].suggestions": suggestions
        }
      };
    } else if (action === "remove") {
      update = { $pull: { aiSuggestions: { _id: aiSuggestionId } } };
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      {
        new: true,
        arrayFilters: action === "update" ? [{ "elem._id": aiSuggestionId }] : []
      }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};