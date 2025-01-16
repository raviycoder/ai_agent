"use client";
import { BotIcon } from "lucide-react";

const BotAvatar = ({ icon }: { icon: string }) => {

  return (
    <div className="flex items-center justify-center space-x-3 min-w-8 min-h-8">
      { icon && icon !== "" ? (
        <p>{ icon }</p>
      ) : (
        <BotIcon className="w-8 h-8 text-gray-800" />
      )}
    </div>
  );
};

export default BotAvatar;