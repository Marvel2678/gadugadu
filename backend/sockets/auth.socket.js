import jwt from "jsonwebtoken";

export function registerAuthSocket(io, socket) {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      socket.disconnect();
      console.log("DISCONNECTED");
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);

    const user_id = decoded.id;
    socket.userId = decoded.id;

    console.log("USER_ID ", user_id);
  } catch (error) {
    console.log("ERROR IN AUTH", error);
    socket.disconnect();
  }
}
