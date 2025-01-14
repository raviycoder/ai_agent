export interface Messages {
    role : string;
    content: string;
    agentId?: string;
    icon?: string;
    timestamp?: Date;
}
export interface Chats {
    _id?: string;
    userId: string;
    sessionId: string;
    purpose: string;
    messages: Messages[];
    createdAt?: Date;
    updatedAt?: Date;
}