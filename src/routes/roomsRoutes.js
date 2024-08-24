import { Router} from 'express';
import {
  createRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} from '../controllers/roomController.js';

const router =new Router();

router.post('/', createRoom);
router.get('/', getAllRooms);
router.get('/:id', getRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;
