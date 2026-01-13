import { ChatType } from "@/types/ChatsType";
import { createContext, Dispatch, useState } from "react";

type ChatContext = {
  chats: ChatType[];
  setChats: Dispatch<React.SetStateAction<ChatType[]>>;
  getChatById: (id: number) => ChatType | undefined;
};

export const ChatContext = createContext<ChatContext | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const getChatById = (id: number) => {
    return chats.find((chat) => chat.conversation_id === id);
  };
  return (
    <ChatContext.Provider value={{ chats, setChats, getChatById }}>
      {children}
    </ChatContext.Provider>
  );
};
