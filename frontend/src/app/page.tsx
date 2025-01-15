"use client";
import AuthGuard from "@/components/AuthGuard";
import Logo from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import useFetchData from "@/hooks/useFetchData";
import { Chats } from "@/utils/Types";
import { NotepadText, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();
  const { data, loading, error } = useFetchData("api/chat/all") as unknown as {
    data: { total: number; chats: Chats[] };
    loading: boolean;
    error: Error | null;
  };
  return (
    <AuthGuard>
      <div className="w-full flex justify-center items-center flex-col max-sm:px-5">
        <div className="w-full max-w-5xl flex flex-col mx-10 gap-y-4 text-center">
          <div className="flex justify-center items-center gap-x-4">
            <Logo className="h-14 w-14 -mt-2" />
            <h1 className="text-4xl font-bold">AI Agents</h1>
          </div>
          <p className="text-lg font-medium">
            Welcome to 🤖 AI Agents, an open source project that allows you to
            create and manage your own AI agents. With AI Agents, you can easily
            create and use them in your daily life workflow.
          </p>
        </div>
        <div className="w-full flex max-sm:flex-col justify-center items-center mt-10 max-w-5xl sm:space-x-5 max-sm:space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="inline-flex items-center">
                {" "}
                <Sparkles className="mr-2" />
                Start a New Conversation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {" "}
                Dive into a fresh chat and explore new ideas or topics. Your
                next great conversation awaits!
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  router.push(`/chat/session_${uuidv4()}`);
                }}
                variant="default"
              >
                Start New
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="inline-flex items-center">
                <NotepadText className="mr-2" />
                Resume Last Conversation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {" "}
                Pick up right where you left off. Revisit your last conversation
                to keep the flow going!
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  if (!loading && !error && data.total > 0) {
                    router.push(`/chat/${data?.chats[0]?.sessionId}`);
                  } else {
                    toast({
                      title: "No Conversation Found",
                      description: "You don't have any conversation to resume",
                      variant: "destructive",
                    });
                  }
                }}
                variant="default"
              >
                {" "}
                Resume Last{" "}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
}
