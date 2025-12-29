import { io } from "socket.io-client";
import socket from "./connection.test.js";

export function ConversationTester(socket) {
  try {
    socket.emit("conversation:join", { conversationId: 1 });
    console.log("✅ Joined to conversation with id", 1);
  } catch (error) {
    console.log("❌ ERROR IN CONVERSATION TESTER: ", error);
    socket.emit("conversation:leave", { conversationId: 1 });
  }
}
