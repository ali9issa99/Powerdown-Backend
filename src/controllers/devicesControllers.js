import { Device } from "../models/devicesModel";

export const createDevice = async (req, res) => {
    try{
        const {device_id, deviceName, room_id, status}= req.body;
            const newDevice = new Device({
                device_id,
                deviceName,
                room_id,
                status,
            });
            
            await newDevice.save();
            res.status(201).json(newDevice);
        }catch(error){
            res.status(500).json({error:error.message});
        }
};
