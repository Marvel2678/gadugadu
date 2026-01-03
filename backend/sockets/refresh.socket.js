import { getConversations } from "../controllers/conversations.js";
import { getUserConversations } from "../services/conversation.service.js";

export function registerReconnect(io, socket) {
  socket.on("user:sync", async () => {
    const conversations = await getUserConversations(socket.userId);

    conversations.forEach((c) => {
      socket.join(`conversation:${c.id}`);
    });
    console.log("🔁 Synced conversations for user", socket.userId);
  });
}
