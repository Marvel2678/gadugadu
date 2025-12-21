import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzY2MzQ5OTcyLCJleHAiOjE3NjY0MzYzNzJ9.wqQ8pbpCyzHFYiSicNzqvODYmqRLt8MEU0j7dTCYdXY",
  },
});

socket.on("connect", () => {
  console.log("✅ Connected as socket:", socket.id);

  socket.emit("conversation:join", { conversationId: 1 });

  socket.emit("message:send", {
    conversationId: 1,
    text: "Pogadamy?",
  });
});

socket.on("message:new", (msg) => {
  console.log("📩 New message:", msg);
});

socket.on("connect_error", (err) => {
  console.log("❌ Connection error:", err.message);
});
