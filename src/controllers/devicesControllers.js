// import { Device } from "../models/devicesModel.js";

// export const createDevice = async (req, res) => {
//     try {
//       const { device_id, deviceName, room_id, status } = req.body;
//       const newDevice = new Device({
//         device_id,
//         deviceName,
//         room_id,
//         status,
//       });
  
//       await newDevice.save();
//       res.status(201).json(newDevice);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };


// export const getDevice = async (req,res) => {
//     try{
//         const device = await Device.findById(req.params.id);
//         if (!device) return res.status(404).json({message: 'Device not found'});
//             res.status(200).json(device);
//     }catch(error){
//         res.status(500).json({error:error.message});
//     }
// };


// export const getAllDevices = async (req, res) => {
//     try {
//       const devices = await Device.find({});
//       res.status(200).json(devices);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

  
// export const updateDevice = async (req, res) => {
//     try {
//       const updatedDevice = await Device.findByIdAndUpdate(
//         req.params.id,
//         {
//           device_id: req.body.device_id,
//           deviceName: req.body.deviceName,
//           room_id: req.body.room_id,
//           status: req.body.status,
//         },
//         { new: true }
//       );
  
//       if (!updatedDevice) return res.status(404).json({ message: 'Device not found' });
//       res.status(200).json(updatedDevice);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };


// export const deleteDevice =async(req,res)=>{
//     try{
//         const deletedDevice =await Device.findByIdAndDelete(req.params.id);
//         if(!deletedDevice) return res.status(404).json({message: 'Device not found'});
//         res.status(200).json({message: 'Device deleted successfully'});
//         }catch(error){
//             res.status(500).json({error: error.message});
//         }
// };


import { Device } from "../models/devicesModel.js";
import { Consumption } from '../models/consumptionModel.js';

export const createDevice = async (req, res) => {
    try {
        const { device_id, deviceName,  status } = req.body;
        const newDevice = new Device({
            device_id,
            deviceName,
            status,
        });

        await newDevice.save();
        res.status(201).json(newDevice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getDevice = async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        if (!device) return res.status(404).json({ message: 'Device not found' });
        res.status(200).json(device);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getAllDevices = async (req, res) => {
    try {
        const devices = await Device.find({});
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateDevice = async (req, res) => {
    try {
        const updatedDevice = await Device.findByIdAndUpdate(
            req.params.id,
            {
                device_id: req.body.device_id,
                deviceName: req.body.deviceName,
                room_id: req.body.room_id,
                status: req.body.status,
            },
            { new: true }
        );

        if (!updatedDevice) return res.status(404).json({ message: 'Device not found' });
        res.status(200).json(updatedDevice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteDevice = async (req, res) => {
    try {
        const deletedDevice = await Device.findByIdAndDelete(req.params.id);
        if (!deletedDevice) return res.status(404).json({ message: 'Device not found' });

        // Now delete all related consumptions for this device
        await Consumption.deleteMany({ device_id: req.params.id });

        res.status(200).json({ message: 'Device and related consumptions deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const modifyDeviceData = async (req, res) => {
  const { deviceId, action, data } = req.body; // action could be "add", "update", "remove"
  const { consumptionId, timeOn, energyUsage } = data; // data related to consumption

  try {
      let update;
      
      if (action === "add") {
          update = { $push: { consumptions: { timeOn, energyUsage } } };
      } else if (action === "update") {
          update = {
              $set: {
                  "consumptions.$[elem].timeOn": timeOn,
                  "consumptions.$[elem].energyUsage": energyUsage
              }
          };
      } else if (action === "remove") {
          update = { $pull: { consumptions: { _id: consumptionId } } };
      } else {
          return res.status(400).json({ message: "Invalid action" });
      }

      const updatedDevice = await Device.findByIdAndUpdate(
          deviceId,
          update,
          { 
              new: true, 
              arrayFilters: action === "update" ? [{ "elem._id": consumptionId }] : []
          }
      );

      if (!updatedDevice) return res.status(404).json({ message: 'Device not found' });
      res.status(200).json(updatedDevice);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};