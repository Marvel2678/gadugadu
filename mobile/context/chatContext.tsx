import { ChatType } from "@/types/ChatsType";
import { createContext, Dispatch, useState } from "react";

type ChatContext = {
  chats: ChatType[];
  setChats: Dispatch<React.SetStateAction<ChatType[]>>;
  getChatById: (id: number) => ChatType | undefined;
  addChat: (chat: ChatType) => void;
};

export const ChatContext = createContext<ChatContext | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<ChatType[]>([]);

  const addChat = (chat: ChatType) => {
    setChats((prev) => [...prev, chat]);
  };

  const getChatById = (id: number) => {
    return chats.find((chat) => chat.conversation_id === id);
  };

  return (
    <ChatContext.Provider value={{ chats, setChats, getChatById, addChat }}>
      {children}
    </ChatContext.Provider>
  );
};
