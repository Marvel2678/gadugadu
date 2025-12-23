import { createMessage } from "../controllers/messages.js";
import { db } from "../index.js";

export function registerMessageSocket(io, socket) {
  socket.on("message:send", async ({ conversation_id, text }) => {
    const message = await createMessage(
      conversation_id,
      socket.userId,
      "text",
      text
    );

    io.to(`conversation:${conversation_id}`).emit("message:new", message);
  });

  socket.on("message:seen", async ({ conversation_id }) => {
    await db.query(
      "UPDATE messages SET seen=TRUE WHERE conversation_id=$1 AND sender_id != $2 AND seen = FALSE",
      [conversation_id, socket.userId]
    );
    io.to(`conversation:${conversation_id}`).emit("message:seen", {
      conversationId: conversation_id,
    });
  });
}
