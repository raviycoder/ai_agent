import Agent from "../models/agentModel.js";

export const createAgent = async (req, res) => {
  try {
    const { title, task, userId, icon } = req.body;

    if (!title || !task || !userId) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const agent = new Agent({ title, task, userId, icon });
    await agent.save();

    res.status(201).json({ message: "Agent created successfully", agent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating agent" });
  }
};

export const getAllAgents = async (req, res) => {
  try {
    const userId = req.user.id;
    const forAll = "6788dcfe30a40b5048671dac";
    const allAgents = await Agent.find({ userId: forAll });
    const agents = await Agent.find({ userId });
    if (agents.length > 0) {
      const totalAgents = agents + allAgents;
      res.status(200).json({ agents: totalAgents });
    }
    res.status(200).json({ agents: allAgents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching agents" });
  }
};

export const getAgent = async (req, res) => {
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
};
