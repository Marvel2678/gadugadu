import { createMessage } from "../controllers/messages.js";

export async function registerMessageSocket(io, socket) {
  socket.on("message:send", async ({ conversation_id, text }) => {
    const message = await createMessage(
      conversation_id,
      socket.userId,
      "text",
      text
    );

    io.to(`conversation:${conversation_id}`).emit("message:new", message);
  });
}
