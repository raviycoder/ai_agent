"use client";
import { SidebarGroup } from "@/components/ui/sidebar";
import { MessageSquare } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "./ui/button";
import { useParams } from "next/navigation";

interface ChatSession {
  userId: string;
  agentId: string;
  sessionId: string;
  purpose: string;
  createdAt: string;
  updatedAt: string;
}

export function ChatHistory({
  hasMore,
  loadMore,
  sessions,
  onSessionClick,
}: {
  hasMore: boolean;
  loadMore: () => void;
  sessions: ChatSession[];
  onSessionClick: (sessionId: string) => void;
}) {
  const { id } = useParams();
  console.log("sessions", id);
  const today = format(new Date(), "yyyy-MM-dd");
  const todaySessions = sessions.filter(
    (session) => format(new Date(session.updatedAt), "yyyy-MM-dd") === today
  );
  const olderSessions = sessions.filter(
    (session) => format(new Date(session.updatedAt), "yyyy-MM-dd") !== today
  );
  const renderSessions = (sessionList: ChatSession[], label: string) => (
    <SidebarGroup>
      <h3 className="px-4 py-2 text-sm font-medium text-gray-500">{label}</h3>
      {sessionList.map((session, index) => (
        <Link key={index} href={`/chat/${session.sessionId}`}>
          <button
            onClick={() => onSessionClick(session.sessionId)}
            className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-start space-x-3 ${
              id === session.sessionId ? "bg-gray-200 hover:bg-gray-200" : ""
            }`}
          >
            <MessageSquare className="h-5 w-5 mt-0.5 text-gray-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session.purpose.slice(0, 20)}{" "}
                {session.purpose.length > 20 && "..."}
              </p>
              <p className="text-xs text-gray-500">
                {format(new Date(session.createdAt), "h:mm a")}
              </p>
            </div>
          </button>
        </Link>
      ))}
    </SidebarGroup>
  );

  return (
    <div className="w-full flex flex-col">
      {todaySessions.length > 0 && renderSessions(todaySessions, "Today")}
      {olderSessions.length > 0 && renderSessions(olderSessions, "Previous")}
      {hasMore && (
        <Button
          variant="outline"
          className="mt-4 mx-4"
          size="default"
          onClick={loadMore}
          disabled={!hasMore}
        >
          {hasMore ? "Load more" : "No more messages"}
        </Button>
      )}
    </div>
  );
}
