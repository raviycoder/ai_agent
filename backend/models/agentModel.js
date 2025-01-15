import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    title: {type: String, required: true},
    task: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    icon: {type: String, default: "🤖"},
});

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;