const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authroutes");
const chatRoutes = require("./routes/chatRoutes");
const agentRoutes = require("./routes/agentRoutes");
const http = require("http");
const { Server } = require("socket.io");
const socketService = require("./services/socketService");
require("dotenv").config();
const cors = require("cors");

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
socketService.createChat(io);

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
    const Port = process.env.PORT || 5000; // Ensure PORT is defined here
    server.listen(Port, () => {
        console.log(`Server running on http://localhost:${Port}`);
    });
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});