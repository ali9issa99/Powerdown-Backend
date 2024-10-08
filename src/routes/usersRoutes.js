// import { Router } from "express";
// import {
//     createUser,
//     updateUser,
//     getUsers,
//     getAllUsers,
//     deleteUser,
// } from "../controllers/usersController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

// const router = new Router();

// // Protect routes that require authentication
// router.post("/", authMiddleware, createUser);
// router.get("/:id", authMiddleware, getUsers);
// router.get("/", authMiddleware, getAllUsers);
// router.put("/:id", authMiddleware, updateUser);
// router.delete("/:id", authMiddleware, deleteUser);

// export default router;



import express from 'express';
import {
    createUser,
    getUsers,
    getAllUsers,
    updateUser,
    deleteUser,
    modifyUserRooms,
    modifyUserAnalytics,
    modifyUserAiSuggestions,
    getUserAiSuggestions, // <-- Ensure this is imported
} from '../controllers/usersController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect routes that require authentication
router.post("/", authMiddleware, createUser);
router.get("/:id", authMiddleware, getUsers);
router.get("/", authMiddleware, getAllUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

// Embedded routes for rooms, devices, consumption, etc.
router.post("/:id/rooms", authMiddleware, modifyUserRooms);
router.put("/:id/analytics", authMiddleware, modifyUserAnalytics);

// Update this to use GET for fetching AI suggestions
router.get("/:id/aisuggestions", authMiddleware, getUserAiSuggestions); // <--- Change to GET
// Use PUT for updating or adding AI suggestions
router.put("/:id/aisuggestions", authMiddleware, modifyUserAiSuggestions);

export default router;
