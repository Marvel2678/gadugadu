import { io } from "socket.io-client";
import { ConversationTester } from "./conversation.test.js";
import { MessageSendingTester } from "./sendingMessage.test.js";
import { ReconnectTester } from "./reconnect.test.js";

const socket = io("http://localhost:8000", {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzY2NTI3MjA5LCJleHAiOjE3NjY2MTM2MDl9.nOplfUbk43-6QU4NxgXgQyfmKOeYM8gQYRdoHesvUUY",
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

ReconnectTester(socket);
socket.on("connect", () => {
  console.log("✅ CONNECT");
  console.log("🆔 socket.id:", socket.id);

  socket.emit("user:sync");
  ConversationTester(socket);

  setTimeout(() => {
    MessageSendingTester(socket);
  }, 1000);
});

socket.on("disconnect", () => {
  console.log("Connection lost ❌");
});

socket.on("reconnect_attempt", (n) => {
  console.log("♻️ reconnect attempt", n);
});

socket.on("reconnect", () => {
  console.log("🔄 reconnect SUCCESS");
});

socket.on("connect_error", (err) => {
  console.log("🔥 connect_error:", err.message);
});
export default socket;
