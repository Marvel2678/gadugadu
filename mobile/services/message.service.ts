import { apiMiddleware } from "@/utils/middleware";
import { socket } from "@/utils/socket";

export const messageService = {
  getMessages: async (conversation_id: number) => {
    try {
      const res = await apiMiddleware.get(`/message/get/${conversation_id}`);
      console.log("RES:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },
  sendMessage: async (
    conversation_id: number,
    text: string,
    temp_id: string,
  ) => {
    try {
      socket.emit("message:send", {
        conversation_id: conversation_id,
        type: "text",
        text: text,
        temp_id: temp_id,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
};
