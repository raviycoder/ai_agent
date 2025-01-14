"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar({ setSearch }: { setSearch: (search: string) => void }) {
  return (
    <div className="relative">
      <Input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search conversations..."
        className="w-full p-2 pl-8 rounded-md border bg-white/5"
      />
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
    </div>
  );
}