const express = require("express");
const chatController = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();


router.post("/generate", authMiddleware.authenticate, chatController.generateResponse);
router.post("/create", authMiddleware.authenticate, chatController.createChat);
router.get("/all", authMiddleware.authenticate, chatController.getAllChats);
router.put("/add", authMiddleware.authenticate, chatController.updateChatMessages);
router.get("/:id", authMiddleware.authenticate, chatController.getChat);

module.exports = router;