import api from "@/utils/api";
import { toast } from "./use-toast";

export interface Agent {
    _id?: string;
    userId: string;
    title: string;
    task: string;
    icon?: string;
}

const useAgent = () => {
    const createAgent = async (data: Agent) => {
        try {
            const response = await api.post("/api/agent/create", data);
            return response.data;
        } catch (error) {
            console.error("Error creating agent:", error);
            toast({
                title: "Error creating agent",
                description: "Please try again later.",
                variant: "destructive",
            });
        }
    };

    return{
        createAgent}
}

export default useAgent