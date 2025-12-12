import express from "express";
import bcrypt from "bcrypt";
import { db } from "../index.js";
import {
  createAccessToken,
  createRefreshToken,
} from "../utils/createTokens.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔐 rejestracja
export const RegisterUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      ok: false,
      message: "You have to complete all boxes",
    });
  }

  const userExists = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  console.log(" count", userExists.rowCount);
  if (userExists.rowCount == 1) {
    return res.status(400).json({
      ok: false,
      message: "This email already exists! Try another one",
    });
  }

  //TODO:
  //dorobić bezpieczeństwo: email checker, password checker

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4)",
    [name, username, email, hashed]
  );

  return res.status(201).json({ ok: true, message: "User registered" });
};

// 🔐 logowanie
export const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("tu");
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];

  if (!user || user === undefined)
    return res.status(401).json({ message: "Invalid email" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res.status(401).json({ message: "Incorrect email or password" });

  const accessToken = await createAccessToken(user);
  const refreshToken = await createRefreshToken(user);

  res.json({ ok: true, accessToken, refreshToken });
};

export const GetUser = async (req, res) => {
  const user = await db.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [req.user.id]
  );

  res.json(user.rows[0]);
};

export const RefreshToken = async (req, res) => {
  const incomingRefreshToken = req.body.refreshToken;
  console.log(incomingRefreshToken);

  if (!incomingRefreshToken) {
    return res.json({ ok: false, message: "No refreshToken" });
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.JWT_SECRET_REFRESH_TOKEN
  );

  const userQuery = await db.query("SELECT email from users WHERE id=$1", [
    decodedToken.payload.user,
  ]);

  if (userQuery.rowCount == 0) {
    return res.json({ ok: false, message: "Invalid token" });
  }

  if (refreshToken !== userQuery.rows.refreshToken) {
    return res.json({ ok: false, message: "Refresh token is expired" });
  }
};
export default router;
