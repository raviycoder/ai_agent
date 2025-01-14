const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
    title: {type: String, required: true},
    task: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    icon: {type: String, default: "🤖"},
});

module.exports = mongoose.model("Agent", agentSchema);