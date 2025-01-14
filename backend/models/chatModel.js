const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ["user", "agent", "assistant"], required: true },
  content: { type: String, required: true },
  agentId: {type: mongoose.Schema.Types.ObjectId, ref: "Agent"},
  icon: {type: String},
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    sessionId: {type: String, required: true},
    purpose: {type: String, required: true},
    messages: [messageSchema],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("Chat", chatSchema);