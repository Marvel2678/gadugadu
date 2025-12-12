import SetupForServer from "../config/config.js";
import { loadConfig } from "../config/serverConfiguration.js";
import jwt from "jsonwebtoken";

const env = await SetupForServer();
const config = loadConfig(env);

export const createAccessToken = async (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    config.JWT_SECRET_ACCESS_TOKEN,
    { expiresIn: "1d" }
  );
  return token;
};

export const createRefreshToken = async (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    config.JWT_SECRET_REFRESH_TOKEN,
    { expiresIn: "30d" }
  );
  return token;
};
