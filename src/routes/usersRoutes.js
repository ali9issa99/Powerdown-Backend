import { Router } from "express";
import {
    createUser,
    updateUser,
    getUsers,
    getAllUsers,
    deleteUser,
} from "../controllers/usersController.js";

const router = new Router();

router.post("/", createUser);
router.get("/:id", getUsers);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;