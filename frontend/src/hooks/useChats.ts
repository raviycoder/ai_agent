import api from "@/utils/api";
import { Chats, Messages } from "@/utils/Types";

const useChats = () => {
    const generateResponse = async (messages: Array <Messages>) => {
        console.log("data",messages);
      try {
        const response = api.post("/api/chat/generate", {messages});
        return (await response).data;
      } catch (error) {
        console.error("Error generating response:", error);
        return null;
      }
    }
  const createChats = async ({data}:{data: Chats}) => {
    try {
      console.log("data",data);
      const response = api.post("/api/chat/create", data);
      return (await response).data;
    } catch (error) {
      console.error("Error creating chat:", error);
      return null;
    }
  };

  const addMessages = async ({chatId, messages}: {chatId: string, messages: Messages}) => {
    console.log("dataererer", chatId, messages);
    try {
      const response = api.put("/api/chat/add", {chatId, messages});
      return (await response).data;
    } catch (error) {
      console.error("Error adding messages:", error);
      return null;
    }
  };

  return {
    createChats,
    addMessages,
    generateResponse
  }

};

export default useChats;
