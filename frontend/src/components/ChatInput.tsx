"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import Agent from "./Agent";
import type { Agent as AgentType } from "@/hooks/useAgent";
import useFetchData from "@/hooks/useFetchData";
import useChats from "@/hooks/useChats";
import { Chats, Messages } from "@/utils/Types";
import { toast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { useChat } from "@/context/ChatContext";
import socket from "@/service/socketService";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
const ChatInput = ({
  refresh,
  setAddMessages,
  chatData,
  setLoad,
  scrollToBottom,
  text,
  setText,
}: {
  refresh: () => void;
  setAddMessages: React.Dispatch<React.SetStateAction<Messages[]>>;
  chatData?: { chatData: Chats };
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToBottom: () => void;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [focused, setFocused] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const { id } = useParams();
  const { addMessage } = useChat();
  const [agents, setAgents] = useState<AgentType[]>([]);
  const { data: user } = useFetchData("/api/auth/user") as unknown as {
    data: { user: { _id: string } };
  };
  const { data, loading, error } = useFetchData("/api/agent/all");
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const { generateResponse, addMessages } = useChats();
  const handleSendMessage = async () => {
    if (!text) {
      toast({
        title: "Please enter a message",
        variant: "destructive",
      });
      return setIsEnter(false);
    }

    if (!selectedAgent) {
      toast({
        title: "Please select an agent",
        variant: "destructive",
      });
      return setIsEnter(false);
    }
    try {
      const userChat = { role: "user", content: text };

      if (chatData && chatData.chatData?._id) {
        // Add user message to local state
        setAddMessages((prevMessages) => [...prevMessages, userChat]);

        // Save user message to the server
        await addMessages({
          chatId: chatData.chatData._id,
          messages: userChat,
        });

        // Prepare the full text for generating a response
        const fullText = selectedAgent
          ? `${selectedAgent.task}\n${text}`
          : text;

        setText(""); // Clear input
        setLoad(true); // Show loading indicator
        scrollToBottom(); // Scroll to the bottom

        // Generate response from server
        const data = await generateResponse([
          { role: "user", content: fullText },
        ]);

        if (data && chatData.chatData._id) {
          // Add response to local state
          setAddMessages((prevMessages) => [...prevMessages, data.response]);
          setLoad(false); // Hide loading indicator

          // Save response to the server with agent details
          if (selectedAgent) {
            await addMessages({
              chatId: chatData.chatData._id,
              messages: {
                ...data.response,
                agentId: selectedAgent?._id || "None",
                icon: selectedAgent?.icon || "",
              },
            });
          }
          scrollToBottom(); // Ensure scroll is at the bottom
        }
      } else {
        setAddMessages((prevMessages) => [...prevMessages, userChat]);
        setText("");
        // Handle new chat creation
        if (selectedAgent && id) {
          setLoad(true);
          const data = await generateResponse([userChat]);

          if (data?.response && user) {
            setAddMessages((prevMessages) => [...prevMessages, data.response]);
            setLoad(false);
            // Save response to the server
            socket.emit("joinSession", {
              userId: user.user._id,
              sessionId: id.toString(),
              purpose: text,
              messages: [
                userChat,
                {
                  ...data.response,
                  agentId: selectedAgent._id,
                  icon: selectedAgent.icon,
                },
              ],
            });
            await socket.on("sessionJoined", (data) => {
              addMessage((preMessages) => [
                data as unknown as Chats,
                ...preMessages,
              ]);
            });
            await refresh();
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
      setLoad(false);
    } finally {
      setIsEnter(false);
    }
  };

  // Update state when data is fetched
  useEffect(() => {
    if (data) {
      setAgents((data as { agents: AgentType[] }).agents);
    }
  }, [data, setAgents]);

  if (loading || error) return null;
  return (
    <Card
      className={`w-full ${
        focused ? "ring-2 ring-offset-2 ring-ring" : ""
      } transition-all duration-200`}
    >
      <CardContent className="p-2 w-full flex-col items-center  gap-2">
        <Agent
          agents={agents}
          setAgents={setAgents}
          setSelectedAgent={setSelectedAgent}
        />
        <div className="flex w-full justify-between">
          {" "}
          <Textarea
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                setIsEnter(true);
                e.preventDefault();
                handleSendMessage();
              } else if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
                setText((prevText) => prevText + "\n");
              }
            }}
            disabled={isEnter}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            rows={4}
            className="resize-none focus-visible:ring-0 border-none w-full"
            placeholder="Type a message..."
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={isEnter}
                  onClick={() => {
                    setIsEnter(true);
                    handleSendMessage();
                  }}
                  size="icon"
                  variant="outline"
                >
                  <SendHorizontal />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send Message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInput;
