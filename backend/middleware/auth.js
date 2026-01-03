import jwt from "jsonwebtoken";
import SetupForServer from "../config/config.js";
import { loadConfig } from "../config/serverConfiguration.js";

const env = await SetupForServer();

const ServerConfiguration = loadConfig(env);

export function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(
      token,
      ServerConfiguration.JWT_SECRET_ACCESS_TOKEN
    );
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
    console.error("ERROR TOKEN: " + token);
  }
}
