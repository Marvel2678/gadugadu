import express from "express";
import cors from "cors";
import ConnectToDatabase from "./db.js";
import SetupForServer from "./config/config.js";
import userRouter from "./routes/userRouter.js";
import { loadConfig } from "./config/serverConfiguration.js";

const env = await SetupForServer();

const ServerConfiguration = loadConfig(env);
const app = express();
export const db = await ConnectToDatabase(ServerConfiguration);

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

const PORT = ServerConfiguration.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
