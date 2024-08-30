import { Room } from "../models/roomsModel.js";
import { Device } from "../models/devicesModel.js";

// Create Room
export const createRoom = async (req, res) => {
    try {
        const { room_id, roomName } = req.body;

        // Check if room_id already exists
        const existingRoom = await Room.findOne({ room_id });
        if (existingRoom) {
            return res.status(400).json({ error: 'room_id already exists' });
        }

        const newRoom = new Room({
            room_id,
            roomName,
            devices: []
        });

        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a Room by ID
export const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: "Room not found" });
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Rooms
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Room
export const updateRoom = async (req, res) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {
                room_id: req.body.room_id,
                roomName: req.body.roomName,
            },
            { new: true }
        );

        if (!updatedRoom) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Room
export const deleteRoom = async (req, res) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        if (!deletedRoom) return res.status(404).json({ message: 'Room not found' });

        // Now delete all related devices for this room
        await Device.deleteMany({ room_id: req.params.id });

        res.status(200).json({ message: 'Room and related devices deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Modify Device Data within Room
export const modifyRoomDevices = async (req, res) => {
  const { roomId, action, data } = req.body; // action could be "add", "update", "remove"
  const { deviceId, deviceName, status } = data; // data related to device

  try {
      let update;

      if (action === "add") {
          const newDevice = new Device({ device_id: deviceId, deviceName, room_id: roomId, status });
          update = { $push: { devices: newDevice } };
      } else if (action === "update") {
          update = {
              $set: {
                  "devices.$[elem].deviceName": deviceName,
                  "devices.$[elem].status": status
              }
          };
      } else if (action === "remove") {
          update = { $pull: { devices: { _id: deviceId } } };
      } else {
          return res.status(400).json({ message: "Invalid action" });
      }

      const updatedRoom = await Room.findByIdAndUpdate(
          roomId,
          update,
          {
              new: true,
              arrayFilters: action === "update" ? [{ "elem._id": deviceId }] : []
          }
      );

      if (!updatedRoom) return res.status(404).json({ message: 'Room not found' });
      res.status(200).json(updatedRoom);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};