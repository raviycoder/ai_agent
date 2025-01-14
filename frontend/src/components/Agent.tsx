import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateAgent } from "./CreateAgent";
import type { Agent as AgentType } from "@/hooks/useAgent";

const Agent = ({ agents, setAgents, setSelectedAgent }: { agents: AgentType[]; setAgents: React.Dispatch<React.SetStateAction<AgentType[]>> ; setSelectedAgent: React.Dispatch<React.SetStateAction<AgentType | null>>}) => {
  // Handle new agent creation
  const handleAgentCreation = (newAgent: AgentType) => {
    setAgents((prevAgents) => [...prevAgents, newAgent]);
  };

  return (
    <div>
      <Select onValueChange={(value) => setSelectedAgent(agents.find((agent) => agent._id === value) ?? null)}>
        <SelectTrigger className="w-[180px] mb-2">
          <SelectValue placeholder="Select an agent" />
        </SelectTrigger>
        <SelectContent>
          {agents.length > 0 &&
            agents.map((agent) => (
              <SelectItem key={agent._id} value={agent._id ?? ""}>
                {agent.title}
              </SelectItem>
            ))}
          <SelectSeparator />
          {/* Pass the callback to CreateAgent */}
          <CreateAgent onAgentCreate={handleAgentCreation} />
        </SelectContent>
      </Select>
    </div>
  );
};

export default Agent;