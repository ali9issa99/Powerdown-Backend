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


export const getDevice = async (req,res) => {
    try{
        const device = await Device.findById(req.params.id);
        if (!device) return res.status(404).json({message: 'Device not found'});
            res.status(200).json(device);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};


export const getAllDevices = async (req,res)=>{
    try{
        const device=await device.find({});
        res.status(200).json(devices);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
