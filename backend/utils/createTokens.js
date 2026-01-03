import SetupForServer from "../config/config.js";
import { loadConfig } from "../config/serverConfiguration.js";
import jwt from "jsonwebtoken";

const env = await SetupForServer();
const config = loadConfig(env);

export const createAccessToken = async (id) => {
  const token = jwt.sign({ id }, config.JWT_SECRET_ACCESS_TOKEN, {
    expiresIn: "1m",
  });
  return token;
};

export const createRefreshToken = async (id) => {
  const token = jwt.sign({ id }, config.JWT_SECRET_REFRESH_TOKEN, {
    expiresIn: "30d",
  });
  return token;
};
