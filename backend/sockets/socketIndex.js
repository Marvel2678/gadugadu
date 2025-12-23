import { Server } from "socket.io";
import { registerAuthSocket } from "./auth.socket.js";
import { registerConversationSocket } from "./conversation.socket.js";
import { registerMessageSocket } from "./message.socket.js";
import { db } from "../index.js";

export async function initSockets(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });
  console.log("🔥 Socket system initialized");

  io.on("connection", async (socket) => {
    registerAuthSocket(io, socket);
    registerConversationSocket(io, socket);
    registerMessageSocket(io, socket);
    console.log("🟢 ONLINE:", socket.userId);

    await db.query("UPDATE users SET online = TRUE WHERE id=$1", [
      socket.userId,
    ]);

    io.emit("user:online", {
      userId: socket.userId,
    });

    socket.on("disconnect", async () => {
      console.log("🔴 OFFLINE:", socket.userId);

      await db.query("UPDATE users SET online = FALSE WHERE id=$1", [
        socket.userId,
      ]);

      io.emit("user:offline", {
        userId: socket.userId,
      });
    });
  });

  return io;
}
