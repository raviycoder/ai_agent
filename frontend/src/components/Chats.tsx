import { Bot, User } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Messages } from "@/utils/Types";
import { useCallback, useEffect, useMemo, useState } from "react";
import BotAvatar from "./BotAvatar";
import ReactMarkdown, { Components } from "react-markdown";
import CustomCodeBlock from "./CustomCodeBlock";
import CopyButton from "./comp-105";

const Chats = ({
  messages,
  load,
  cardRef,
}: {
  messages: Messages[];
  load: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
}) => {
  const [show, setShow] = useState<number | null>(null);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots === "..." ? "" : prevDots + "."));
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  const handleMouseEnter = useCallback((index: number) => {
    setShow(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShow(null);
  }, []);

  const markdownComponents = useMemo(
    () => ({
      code({
        className,
        children,
        ...props
      }: React.HTMLAttributes<HTMLElement>) {
        const match = /language-(\w+)/.exec(className || "");
        const language = match ? match[1] : "text";

        return match ? (
          <CustomCodeBlock
            language={language}
            code={String(children).replace(/\n$/, "")}
          />
        ) : (
          <code
            className="px-2 py-1 bg-gray-200 dark:bg-gray-900 text-sm rounded"
            {...props}
          >
            {children}
          </code>
        );
      },
      blockquote({ children }: { children: React.ReactNode }) {
        return (
          <blockquote className="border-l-4 pl-4 italic text-gray-600 dark:text-gray-400">
            {children}
          </blockquote>
        );
      },
      h1({ children }: { children: React.ReactNode }) {
        return <h1 className="text-2xl font-bold">{children}</h1>;
      },
      a({
        children,
        href,
      }: {
        children: React.ReactNode;
        href: string | undefined;
      }) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {children}
          </a>
        );
      },
    }),
    [] // Ensures this object is memoized and not recreated on each render
  );

  return (
    <div
      ref={cardRef}
      className="max-w-full mx-4 flex flex-col gap-4 p-4 max-sm:p-2"
    >
      {messages.map((message, index) => (
        <Card
          key={index}
          className={`border-none shadow-none relative ${
            message.role === "user" ? "self-end max-w-2xl" : "max-w-[80rem]"
          }`}
        >
          <CardContent
            className={`flex ${
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            } items-start gap-4`}
          >
            <div className="flex items-center justify-center min-w-10 h-10 bg-gray-200 text-black border border-gray-600 rounded-full">
              {message.role === "user" ? (
                <User className="text-xl" />
              ) : (
                <BotAvatar icon={message.icon as string} />
              )}
            </div>
            <div
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`max-w-full ${
                message.role === "user"
                  ? "bg-blue-50 text-black"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              } px-4 py-1 rounded-lg shadow`}
            >
              <ReactMarkdown
                components={markdownComponents as Components}
                className="leading-10"
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </CardContent>
          {show === index && message.role !== "user" && (
            <div
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="absolute -top-6 left-24"
            >
              <CopyButton text={message.content} />
            </div>
          )}
        </Card>
      ))}
      {load && (
        <Card className="max-w-[40rem] self-start border-none shadow-none">
          <CardContent className="flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-200 text-black border border-gray-600 rounded-full">
              <Bot className="text-xl" />
            </div>
            <div className="h-10 w-60 flex items-center justify-start gap-2 rounded bg-gray-100 dark:bg-gray-800 shadow p-4">
              <span className="animate-pulse">Generating{dots}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Chats;
