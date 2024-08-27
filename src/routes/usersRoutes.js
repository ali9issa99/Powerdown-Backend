// import { Router } from "express";
// import {
//     createUser,
//     updateUser,
//     getUsers,
//     getAllUsers,
//     deleteUser,
// } from "../controllers/usersController.js";

// const router = new Router();

// router.post("/", createUser);
// router.get("/:id", getUsers);
// router.get("/", getAllUsers);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

// export default router;


import { Router } from "express";
import {
    createUser,
    updateUser,
    getUsers,
    getAllUsers,
    deleteUser,
} from "../controllers/usersController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = new Router();

// Protect routes that require authentication
router.post("/", authMiddleware, createUser);
router.get("/:id", authMiddleware, getUsers);
router.get("/", authMiddleware, getAllUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;