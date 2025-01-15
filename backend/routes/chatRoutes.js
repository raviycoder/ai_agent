import express from "express";
import { createChat, getAllChats, getChat, getResponse, updateChatMessages } from "../controllers/chatController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/generate", authenticate, getResponse);
router.post("/create", authenticate, createChat);
router.get("/all", authenticate, getAllChats);
router.put("/add", authenticate, updateChatMessages);
router.get("/:id", authenticate, getChat);

export default router;