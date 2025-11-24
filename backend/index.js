import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectToDatabase from "./db.js";
import SetupForServer from "./config.js";

const env = await SetupForServer();
console.log(env);
dotenv.config({ path: `./${env}` });
const app = express();

app.use(express.json());
app.use(cors());
export const db = await ConnectToDatabase();

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
