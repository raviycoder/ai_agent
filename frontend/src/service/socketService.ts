import { io } from "socket.io-client";

const socket = io("https://ai-agent-backend-zpr6.onrender.com");

export default socket;