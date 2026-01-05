import { io } from "socket.io-client";
import { AppConfig } from "./appConfig";
import { tokenStorage } from "./token.storage";
import { getMe } from "@/services/auth.service";

export const socket = io(AppConfig.SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

export const reconnectAndSyncSocket = async () => {
  const token = await tokenStorage.getAccessToken();
  const { user } = await getMe();
  try {
    if (token) {
      socket.auth = { token };
      socket.user_id = user.id;
      socket.emit("user:sync", (data) => {
        console.log("USER SYNC EVENT:", data);
      });
    }
    if (!socket.connected) {
      socket.connect();
    }
  } catch (error) {
    console.error("Socket reconnection error:", error);
  }
};
