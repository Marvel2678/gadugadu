import { db } from "../index.js";

export async function registerConversationSocket(io, socket) {
  socket.on("conversation:join", async (conversation_id) => {
    try {
      console.log("TUUUU");
      socket.join(`conversation:${conversation_id}`);
      console.log("User has joined to conversation ", conversation_id);

      await db.query(
        "UPDATE messages SET delivered=TRUE WHERE sender_id != $1 AND conversation_id = $2 AND delivered = FAlSE",
        [socket.user_id, conversation_id]
      );
    } catch (error) {
      console.log("ERROR in conversation Socket: ", error);
    }

    // io.to(`conversation:${conversation_id}`).emit("message:delivered", {
    //   conversationId: conversation_id,
    // });
  });
  socket.on("conversation:leave", ({ conversation_id }) => {
    socket.leave(`conversation:${conversation_id}`);
  });

  socket.on("conversation:create", (conversation_id) => {
    //Do wdrożenia realtime dodawania konwersacji
  });

  socket.on("typing:start", ({ conversation_id }) => {
    socket
      .to(`conversation:${conversation_id}`)
      .emit("typing:start", { user_id: socket.user_id });
  });

  socket.on("typing:stop", ({ conversation_id }) => {
    socket
      .to(`conversation:${conversation_id}`)
      .emit("typing:stop", { user_id: socket.user_id });
  });
}
