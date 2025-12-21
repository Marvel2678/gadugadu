import { Server } from "socket.io";
import { registerAuthSocket } from "./auth.socket.js";
import { registerConversationSocket } from "./conversation.socket.js";
import { registerMessageSocket } from "./message.socket.js";

export function initSockets(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });
  console.log("🔥 Socket system initialized");

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);

    registerAuthSocket(io, socket);
    registerConversationSocket(io, socket);
    registerMessageSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });

  return io;
}
