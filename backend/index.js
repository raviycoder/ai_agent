import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { createChat } from "./services/socketService.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/agent', agentRoutes);

// Attach Socket.IO
createChat(io);

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    const Port = process.env.PORT || 5000; // Ensure PORT is defined here
    server.listen(Port, () => {
        console.log(`Server running on port ${Port}`);
    });
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});