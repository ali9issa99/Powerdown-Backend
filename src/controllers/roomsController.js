import { Room } from "../models/roomsModel.js";

export const createRoom = async (req, res) => {
    try {
      const { room_id, roomName, devices } = req.body;
      const newRoom = new Room({
        room_id,
        roomName,
        devices,
      });
  
      await newRoom.save();
      res.status(201).json(newRoom);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  