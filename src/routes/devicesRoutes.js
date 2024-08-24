import { Router } from "express";
import { 
    createDevice, 
    getDevice,
    getAllDevices,
    updateDevice,
    deleteDevice } from "../controllers/devicesControllers.js";

const router =new Router();

router.post('/devices',createDevice)
router.get('/devices',getAllDevices)
router.get('/devices/:id',getDevice)
router.put('/devices/:id',updateDevice)
router.delete('/devices/:id',deleteDevice)

export default router;