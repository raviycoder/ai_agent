// /context/ChatContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import {Chats} from "@/utils/Types"

interface ChatContextProps {
  messages: Chats[];
  addMessage: (update: (preMessages: Chats[]) => Chats[]) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Chats[]>([]);

  const addMessage = (update: (preMessages: Chats[]) => Chats[]) => {
    setMessages(update(messages));
  }

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};