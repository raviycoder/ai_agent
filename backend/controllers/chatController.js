const chatService = require("../services/chatService");
const Chat = require("../models/chatModel");

exports.generateResponse = async (req, res, next) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      const error = new Error(
        "Messages array is required and cannot be empty."
      );
      error.statusCode = 400;
      throw error;
    }

    const response = await chatService.generateResponse(messages);
    res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
};

exports.createChat = async (req, res) => {
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

exports.updateChatMessages = async (req, res) => {
  try {
    const { chatId, messages } = req.body;

    if (!chatId || !messages) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }


    const chat = await Chat.findByIdAndUpdate(chatId);
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

exports.getAllChats = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 10;

    const skip = (page - 1) * pageSize;
    const total = await Chat.countDocuments();

    // Sort by createdAt in descending order
    const chats = await Chat.find()
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.status(200).json({ chats, page, pageSize, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching chats" });
  }
};


exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.find({sessionId: req.params.id});
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    const chatData = chat[0]
    res.status(200).json({ chatData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching chat" });
  }
};