/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import { SearchBar } from "./SearchBar";
import { ChatHistory } from "./ChatHistory";
import { UserAvatar } from "./UserAvatar";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import DotLoader from "./icons/loader";
// import socket from "@/service/socketService";
import { Chats } from "@/utils/Types";
import { useChat } from "@/context/ChatContext";
import socket from "@/service/socketService";
import Logo from "./icons/Logo";
import Link from "next/link";

interface ChatSession {
  userId: string;
  agentId: string;
  sessionId: string;
  purpose: string;
  createdAt: string;
  updatedAt: string;
}

// const sessions: ChatSession[] = [
//   {
//     userId: "60d5ec49f1a2b8f1a4e5e8c1",
//     agentId: "60d5ec49f1a2b8f1a4e5e8c2",
//     sessionId: "session_001",
//     purpose: "Customer support inquiry",
//     createdAt: "2025-01-04T09:00:00Z",
//     updatedAt: "2025-01-04T09:00:00Z",
//   },
//   {
//     userId: "60d5ec49f1a2b8f1a4e5e8c3",
//     agentId: "60d5ec49f1a2b8f1a4e5e8c4",
//     sessionId: "session_002",
//     purpose: "Product recommendation",
//     createdAt: "2025-01-04T09:15:00Z",
//     updatedAt: "2025-01-04T09:15:00Z",
//   },
//   {
//     userId: "60d5ec49f1a2b8f1a4e5e8c5",
//     agentId: "60d5ec49f1a2b8f1a4e5e8c6",
//     sessionId: "session_003",
//     purpose: "Technical support request",
//     createdAt: "2025-01-04T09:30:00Z",
//     updatedAt: "2025-01-04T09:30:00Z",
//   },
//   {
//     userId: "60d5ec49f1a2b8f1a4e5e8c7",
//     agentId: "60d5ec49f1a2b8f1a4e5e8c8",
//     sessionId: "session_004",
//     purpose: "Billing inquiry",
//     createdAt: "2025-01-04T09:45:00Z",
//     updatedAt: "2025-01-04T09:45:00Z",
//   },
//   {
//     userId: "60d5ec49f1a2b8f1a4e5e8c9",
//     agentId: "60d5ec49f1a2b8f1a4e5e8ca",
//     sessionId: "session_005",
//     purpose: "Feedback collection",
//     createdAt: "2025-01-04T10:00:00Z",
//     updatedAt: "2025-01-04T10:00:00Z",
//   },
//   {
//     userId: "60d5ec49f1a2b8f1a4e5e8cb",
//     agentId: "60d5ec49f1a2b8f1a4e5e8cc",
//     sessionId: "session_006",
//     purpose: "Appointment scheduling",
//     createdAt: "2025-01-04T10:15:00Z",
//     updatedAt: "2025-01-04T10:15:00Z",
//   },
//   {
//     userId: "60d5ec49f1a2b8f1a4e5e8cd",
//     agentId: "60d5ec49f1a2b8f1a4e5e8ce",
//     sessionId: "session_007",
//     purpose: "'Service cancellation request'",
//     createdAt: "2025-01-04T10:30:00Z",
//     updatedAt: "2025-01-04T10:30:00Z",
//   },
//   {
//     userId: "60d5ec49f1a2b8f1a4e5e8cf",
//     agentId: "60d5ec49f1a2b8f1a4e5e8d0",
//     sessionId: "session_008",
//     purpose: "Product return inquiry",
//     createdAt: "2025-01-04T10:45:00Z",
//     updatedAt: "2025-01-04T10:45:00Z",
//   },
//   {
//     userId: "60d5ec49f1a2b8f1a4e5e8d1",
//     agentId: "60d5ec49f1a2b8f1a4e5e8d2",
//     sessionId: "session_009",
//     purpose: "General inquiry",
//     createdAt: "2025-01-04T11:00:00Z",
//     updatedAt: "2025-01-04T11:00:00Z",
//   },
//   {
//     userId: "60d5ec49f1a2b8f1a4e5e8d3",
//     agentId: "60d5ec49f1a2b8f1a4e5e8d4",
//     sessionId: "session_010",
//     purpose: "Service upgrade request",
//     createdAt: "2025-01-06T11:15:00Z",
//     updatedAt: "2025-01-06T11:15:00Z",
//   },
// ];

export function AppSidebar() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // const [sessionData, setSessionData] = useState<ChatSession[]>([]);
  const { messages, addMessage } = useChat();
  const { data, loading, error } = useFetchData(`/api/auth/user`);
  const { data: session, loading: sessionsLoading } = useFetchData(
    `/api/chat/all?page=${page}&size=12`
  ) as unknown as {
    data: {
      total: number;
      chats: ChatSession[];
      sessionId: string;
    };
    loading: boolean;
    refresh: () => void;
    error: Error | null;
  };
  const pathname = usePathname() ?? "";
  console.log("session", session);
  useEffect(() => {
    if ((session !== undefined || null) && session) {
      const newSessions = session.chats?.filter(
        (chat) => !messages.some((prev) => prev.sessionId === chat.sessionId)
      );
      addMessage((preMessages) => [
        ...preMessages,
        ...(newSessions as unknown as Chats[]),
      ]);
      // setSessionData((prevSessions) => [...prevSessions, ...newSessions]);
      setHasMore(messages.length + newSessions.length < session.total);

      return () => {
        socket.disconnect();
      };
    }
  }, [session]);

  const loadMore = () => {
    if (!hasMore || sessionsLoading) return;
    setPage((prevPage) => prevPage + 1);
  };

  const Urls = ["/auth/login", "/auth/sign-up"];
  const isLogin = Urls.includes(pathname);

  if (isLogin) {
    return null;
  }
  // Filter sessions based on the search term
  const filteredSessions = messages?.filter((session: { purpose: string }) =>
    session.purpose.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-left">
        <Link className="flex items-center mb-2 ml-4" href="/">
          <Logo className="h-6 w-6" />{" "}
          <span className="ml-2 font-bold">AI Agents</span>
        </Link>
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-4">Chat History</h2>
          <SearchBar setSearch={(search) => setSearch(search)} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea id="scroll-area">
          {!sessionsLoading && session ? (
            <ChatHistory
              loadMore={loadMore}
              hasMore={hasMore}
              sessions={filteredSessions as unknown as ChatSession[]}
              onSessionClick={() => {}}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <DotLoader />
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 border-t">
          {!loading && !error && data && <UserAvatar data={data} />}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
