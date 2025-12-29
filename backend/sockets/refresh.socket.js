import { getConversations } from "../controllers/conversations.js";

export function registerReconnect(io, socket) {
  socket.on("user:sync", async () => {
    const conversations = await getConversations(socket.userId);

    conversations.forEach((c) => {
      socket.join(`conversation:${c.id}`);
    });
    console.log("🔁 Synced conversations for user", socket.userId);
  });
}
