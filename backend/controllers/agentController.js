const Agent = require("../models/agentModel");

exports.createAgent = async (req, res) => {
    try {
        const { title, task, userId, icon } = req.body;

        if (!title || !task || !userId) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const agent = new Agent({ title, task, userId, icon });
        await agent.save();

        res.status(201).json({ message: "Agent created successfully", agent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating agent" });
    }
}

exports.getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json({ agents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching agents" });
    }
}

exports.getAgent = async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).json({ message: "Agent not found" });
        }
        res.status(200).json({ agent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching agent" });
    }
}