import { Router } from "express";
import { 
    createDevice, 
    getDevice,
    getAllDevices,
    updateDevice,
    deleteDevice 
} from "../controllers/devicesControllers.js";

const router =new Router();

router.post('/',createDevice)
router.get('/',getAllDevices)
router.get('/:id',getDevice)
router.put('/:id',updateDevice)
router.delete('/:id',deleteDevice)

export default router;