import { db } from "../index.js";

export async function registerConversationSocket(io, socket) {
  socket.on("conversation:join", ({ conversation_id }) => {
    socket.join(`conversation:${conversation_id}`, async () => {
      console.log("User has joined to conversation ", conversation_id);

      await db.query(
        "UPDATE messages SET delivered=TRUE WHERE sender_id != $1 AND conversation_id = $2 AND delivered = FAlSE",
        [socket.userId, conversation_id]
      );

      io.to(`conversation:${conversation_id}`).emit("message:delivered", {
        conversationId: conversation_id,
      });
    });
  });
  socket.on("conversation:leave", ({ conversation_id }) => {
    socket.leave(`conversation:${conversation_id}`);
  });

  socket.on("typing:start", ({ conversation_id }) => {
    socket
      .to(`conversation:${conversation_id}`)
      .emit("typing:start", { userId: socket.userId });
  });

  socket.on("typing:stop", ({ conversation_id }) => {
    socket
      .to(`conversation:${conversation_id}`)
      .emit("typing:stop", { userId: socket.userId });
  });
}
