import { ChatContext } from "@/context/chatContext";
import { useContext } from "react";
export const useChats = () => {
  const chatContext = useContext(ChatContext);
  if (!chatContext) {
    throw new Error("useChats must be used within a ChatProvider");
  }
  return chatContext;
};
