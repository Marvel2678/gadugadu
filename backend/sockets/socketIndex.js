import { Server } from "socket.io";
import { registerAuthSocket } from "./auth.socket.js";
import { registerConversationSocket } from "./conversation.socket.js";
import { registerMessageSocket } from "./message.socket.js";
import { db } from "../index.js";
import { registerReconnect } from "./refresh.socket.js";

export async function initSockets(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });
  console.log("🔥 Socket system initialized");

  io.on("connect", async (socket) => {
    registerAuthSocket(io, socket);
    registerConversationSocket(io, socket);
    registerMessageSocket(io, socket);
    registerReconnect(io, socket);

    // socket.emit("user:sync");
    console.log("🟢 ONLINE:", socket.user_id);
    //TODO
    // Make time stamp for last online
    // Make automatically set offline after no connection for X minutes
    await db.query("UPDATE users SET online = TRUE WHERE id=$1", [
      socket.user_id,
    ]);

    io.emit("user:online", {
      user_id: socket.user_id,
    });

    socket.on("disconnect", async () => {
      console.log("🔴 OFFLINE:", socket.user_id);

      await db.query("UPDATE users SET online = FALSE WHERE id=$1", [
        socket.user_id,
      ]);

      io.emit("user:offline", {
        user_id: socket.user_id,
      });
    });
  });

  return io;
}
