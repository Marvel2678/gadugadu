import { io } from "socket.io-client";

const userSocket1 = io("http://localhost:8000", {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzY2MzQ5OTcyLCJleHAiOjE3NjY0MzYzNzJ9.wqQ8pbpCyzHFYiSicNzqvODYmqRLt8MEU0j7dTCYdXY",
  },
});

const userSocket2 = io("http://localhost:8000", {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzY2NDI4MTY3LCJleHAiOjE3NjY1MTQ1Njd9.Owa15uYababiPbEqefrKLDVpCy7Dlz5oVccYXOxof2M",
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  },
});

userSocket1.on("connect", () => {
  console.log("✅ Connected as socket:", userSocket1.id);

  userSocket1.emit("conversation:join", { conversationId: 1 });

  userSocket1.emit("message:send", {
    conversationId: 1,
    text: "Pogadamy?",
  });
});

//drugi user
userSocket2.on("connect", () => {
  console.log("✅ Connected as socket:", userSocket2.id);

  userSocket2.emit("conversation:join", { conversationId: 1 });

  userSocket2.emit("message:send", {
    conversationId: 1,
    text: "Pogadamy?",
  });
});

userSocket2.on("message:new", (msg) => {
  console.log("📩 New message:", msg);
});

userSocket1.on("message:new", (msg) => {
  console.log("📩 New message:", msg);
});

userSocket1.on("connect_error", (err) => {
  console.log("❌ Connection error:", err.message);
});

userSocket2.on("connect_error", (err) => {
  console.log("❌ Connection error:", err.message);
});
