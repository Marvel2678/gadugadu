import { io } from "socket.io-client";

export const socket = io("http://192.168.0.30:8000", {
  transports: ["websocket"],
});
