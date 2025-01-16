import Chat from "../models/chatModel.js";
import { generateResponse } from "../services/chatService.js";

export const getResponse = async (req, res, next) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      const error = new Error(
        "Messages array is required and cannot be empty."
      );
      error.statusCode = 400;
      throw error;
    }

    const response = await generateResponse(messages);
    res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
};

export const createChat = async (req, res) => {
  try {
    const { userId, sessionId, purpose, messages } = req.body;

    if (!userId || !sessionId || !purpose || !messages) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const chat = new Chat({ userId, sessionId, purpose, messages });
    await chat.save();

    res.status(201).json({ message: "Chat created successfully", chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating chat" });
  }
};

export const updateChatMessages = async (req, res) => {
  try {
    const { chatId, messages } = req.body;
    const userId = req.user.id;

    if (!chatId || !messages) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const chat = await Chat.findByIdAndUpdate({ chatId, userId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.updatedAt = new Date();
    chat.messages = [...chat.messages, messages];
    await chat.save();

    res
      .status(200)
      .json({ message: "Chat messages updated successfully", chat, messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating chat messages" });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 10;

    const skip = (page - 1) * pageSize;
    const total = await Chat.countDocuments({ userId });

    // Sort by createdAt in descending order
    const chats = await Chat.find({ userId })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({ chats, page, pageSize, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching chats" });
  }
};

export const getChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const chat = await Chat.find({ sessionId: req.params.id, userId });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    const chatData = chat[0];
    res.status(200).json({ chatData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching chat" });
  }
};
