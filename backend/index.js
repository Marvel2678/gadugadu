import express from "express";
import cors from "cors";
import ConnectToDatabase from "./db.js";
import SetupForServer from "./config/config.js";
import userRouter from "./routes/userRouter.js";
import { loadConfig } from "./config/serverConfiguration.js";
import conversationRouter from "./routes/conversationRouter.js";
import http from "http";
import { initSockets } from "./sockets/socketIndex.js";

const env = await SetupForServer();

const ServerConfiguration = loadConfig(env);
const app = express();
const server = http.createServer(app);
export const db = await ConnectToDatabase(ServerConfiguration);

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/conversation", conversationRouter);

const io = initSockets(server);

const PORT = ServerConfiguration.SERVER_PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
