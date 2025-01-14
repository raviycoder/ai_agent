"use client";
import { Clock, User } from "lucide-react";

interface UserAvatarProps {
  user: {
    email: string;
  };
}

export function UserAvatar({ data }: { data?: UserAvatarProps }) {
  if (!data) return null
  const { email } = data.user || {};
  return (
    <div className="flex items-center space-x-3">
      <User className="h-8 min-w-8 rounded-full bg-gray-200 p-1" />
      <div className="flex-1">
        <p className="text-sm font-medium">{email || "Unknown User"}</p>
        <p className="text-xs text-gray-500">Active</p>
      </div>
      <Clock className="h-5 w-5 text-gray-400" />
    </div>
  );
}