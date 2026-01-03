import { io } from "socket.io-client";
import { AppConfig } from "./appConfig";
import { tokenStorage } from "./token.storage";

export const socket = io(AppConfig.SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

export const reconnectSocket = async () => {
  const token = await tokenStorage.getAccessToken();
  try {
    if (token) {
      socket.auth = { token };
    }
    if (!socket.connected) {
      socket.connect();
    }
  } catch (error) {
    console.error("Socket reconnection error:", error);
  }
};
