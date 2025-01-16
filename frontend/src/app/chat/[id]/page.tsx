"use client";
import AuthGuard from "@/components/AuthGuard";
import ChatInput from "@/components/ChatInput";
import Chats from "@/components/Chats";
import DotLoader from "@/components/icons/loader";
import { Button } from "@/components/ui/button";
import useFetchData from "@/hooks/useFetchData";
import { Messages } from "@/utils/Types";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useRouter } from "next/navigation";
import { memo, RefObject, useEffect, useRef, useState } from "react";
import PromptCards from "@/components/PromptCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ChatData {
  chatData: {
    messages: Messages[];
    // other properties
  };
  // other properties
}

// Main component
const Page = () => {
  const { id } = useParams<{ id: string }>(); // Ensure `id` has a proper type
  const [addMessages, setAddMessages] = useState<Messages[]>([]);
  const [text, setText] = useState("");
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const { data, loading, error, refresh } = useFetchData(`/api/chat/${id}`);
  const scrollToBottom = () => {
    if (cardRef.current) {
      cardRef.current.scrollTo({
        top: cardRef.current.scrollHeight,
        behavior: "smooth", // Enables smooth scrolling
      });
    }
  };

  useEffect(() => {
    if (data && (data as ChatData).chatData) {
      const chatData = (data as ChatData).chatData?.messages;
      setAddMessages(chatData);
    }
  }, [data]);

  const handleNewChat = () => {
    const newId = `session_${uuidv4()}`;
    router.push(`/chat/${newId}`);
  };

  if (loading) {
    return (
      <div className="w-full relative flex justify-evenly items-center flex-col h-[95vh] px-4 ">
        <div className="w-full flex justify-center items-center flex-col h-[60vh]">
          <p>Loading Chats...</p>
          <DotLoader width={50} height={50} />
        </div>
        <ChatInput
          text={text}
          setText={setText}
          scrollToBottom={scrollToBottom}
          setLoad={setLoad}
          setAddMessages={setAddMessages}
          refresh={refresh}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }
  if (addMessages && data && addMessages.length > 0) {
    return (
      <AuthGuard>
        <div className="w-full relative flex justify-center items-center h-[95vh] ">
          <div className="w-full sm:max-w-7xl flex flex-col h-full mx-5 gap-y-4 justify-evenly">
            <div className="self-end -mt-5">
              <Button onClick={handleNewChat} variant={"outline"}>
                <Plus className="mr-1" />
                New Chat
              </Button>
            </div>
            <div className="overflow-y-auto min-h-[28rem] w-full">
              {" "}
              {loading ? (
                <div className="w-full flex justify-center items-center flex-col max-sm:mx-1">
                  <p>Loading Chats...</p>
                  <DotLoader width={50} height={50} />
                  <ChatInput
                    text={text}
                    setText={setText}
                    scrollToBottom={scrollToBottom}
                    setLoad={setLoad}
                    chatData={data}
                    setAddMessages={setAddMessages}
                    refresh={refresh}
                  />
                </div>
              ) : (
                <Chats
                  cardRef={cardRef as RefObject<HTMLDivElement>}
                  load={load}
                  messages={addMessages}
                />
              )}
            </div>
            <div className="mb-3">
              <ChatInput
                text={text}
                setText={setText}
                scrollToBottom={scrollToBottom}
                setLoad={setLoad}
                chatData={data}
                setAddMessages={setAddMessages}
                refresh={refresh}
              />
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  } else {
    return (
      <AuthGuard>
        <div className="w-full relative flex justify-center items-stretch h-[95vh]">
          <div className="w-full max-w-7xl flex flex-col mx-5 h-full items-stretch justify-evenly">
            <div className="w-full flex flex-grow justify-around items-center flex-col overflow-y-auto">
              {" "}
              <PromptCards
                onSelectPrompt={({ text }: { text: string }) => {
                  setText(text);
                }}
              />
            </div>
            <div className="mb-2">
              <ChatInput
                text={text}
                setText={setText}
                scrollToBottom={scrollToBottom}
                setLoad={setLoad}
                setAddMessages={setAddMessages}
                refresh={refresh}
              />
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }
};

export default memo(Page);
