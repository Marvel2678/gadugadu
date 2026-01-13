import { createMessage } from "../controllers/messages.js";
import { db } from "../index.js";
import { createMessageFunc } from "../services/messages.service.js";

export function registerMessageSocket(io, socket) {
  socket.on(
    "message:send",
    async ({ conversation_id, type, text, temp_id }) => {
      try {
        const isMember = await db.query(
          "SELECT 1 FROM conversation_members WHERE conversation_id=$1 AND user_id=$2",
          [conversation_id, socket.user_id]
        );

        if (!isMember.rowCount) return;
        const { message_id } = await createMessageFunc(
          conversation_id,
          socket.user_id,
          type,
          text
        );
        const message = {
          id: message_id || temp_id,
          conversation_id: conversation_id,
          sender_id: socket.user_id,
          type,
          text,
        };
        io.to(`conversation:${conversation_id}`).emit("message:new", {
          message: message,
          temp_id: temp_id,
        });
        console.log("JEST OK✅");
      } catch (error) {
        // socket.emit("message:error", {
        //   temp_id,
        //   error: "SEND_FAILED",
        // });
        console.log("SOCKET MESSAGE ERROR", error);
      }
    }
  );

  socket.on("message:seen", async ({ conversation_id }) => {
    try {
      await db.query(
        "UPDATE messages SET seen=TRUE WHERE conversation_id=$1 AND sender_id != $2 AND seen = FALSE",
        [conversation_id, socket.user_id]
      );
      io.to(`conversation:${conversation_id}`).emit("message:seen", {
        conversationId: conversation_id,
      });
    } catch (error) {}
  });

  // socket.on("message:error", { error, temp_id });
}
