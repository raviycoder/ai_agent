import Chat from "../models/chatModel.js";

export const socketService = (io) => {
  io.on("connection", (socket) => {

    // Example: Emit a new chat when it is created
    socket.on("createChat", (chat) => {
      // Save chat to DB logic here...
      io.emit("newChat", chat); // Broadcast the new chat to all connected clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export const createChat = (io) => {
  io.on("connection", (socket) => {

    socket.on("joinSession", async ({ userId, sessionId, purpose, messages }) => {
      try {
        // Find or create a chat for the session
        let chat = await Chat.findOne({ sessionId });
        if (!chat) {
          chat = new Chat({ userId, sessionId, purpose, messages });
          await chat.save();
        } else {
          chat.updatedAt = new Date();
          chat.messages = [...chat.messages, messages];
          await chat.save();
        }

        // Join the session and emit the chat data
        socket.join(sessionId);
        socket.emit("sessionJoined", chat);
      } catch (error) {
        socket.emit("error", { message: "Unable to join session", error });
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
