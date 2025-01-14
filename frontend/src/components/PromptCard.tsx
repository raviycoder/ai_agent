import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code2,
  MessageSquare,
} from "lucide-react";

interface Prompt {
  id: string;
  title: string;
  text: string;
  agent: string;
  icon: React.ReactNode;
  category: string;
}

const prebuiltPrompts: Prompt[] = [
  {
    id: "677a38a693ae8f495ae1eb12",
    title: "Text Summarizer",
    text: "Summarize this text for me:",
    agent: "summarizer_agent",
    icon: <Code2 className="h-8 w-8" />,
    category: "Creative"
  },
  {
    id: "677a398a93ae8f495ae1eb14",
    title: "Story Creator",
    text: "Write a story about...",
    agent: "story_agent",
    icon: <MessageSquare className="h-8 w-8" />,
    category: "Creative"
  },
  {
    id: "677a3a1c93ae8f495ae1eb16",
    title: "Chat",
    text: "Can you help me write...",
    agent: "chat_agent",
    icon: <MessageSquare className="h-8 w-8" />,
    category: "Creative"
  },
];

interface PromptCardsProps {
  onSelectPrompt: (prompt: { text: string; agent: string }) => void;
}

const PromptCards: React.FC<PromptCardsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Start a New Conversation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prebuiltPrompts.map((prompt) => (
          <Card onClick={() => onSelectPrompt({ text: prompt.text, agent: prompt.id })} key={prompt.id} className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {prompt.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{prompt.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {prompt.category}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">
                {prompt.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PromptCards;