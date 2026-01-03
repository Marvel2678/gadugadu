import express from "express";
import bcrypt from "bcrypt";
import { db } from "../index.js";
import {
  createAccessToken,
  createRefreshToken,
} from "../utils/createTokens.js";
import jwt from "jsonwebtoken";

export const RegisterUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      ok: false,
      message: "You have to complete all boxes",
    });
  }

  const userExists = await db.query(
    "SELECT * FROM users WHERE email = $1 OR username = $2",
    [email, username]
  );

  console.log("count", userExists.rowCount);
  if (userExists.rowCount == 1) {
    if (userExists.rows[0].username === username) {
      return res.status(400).json({
        ok: false,
        message: "This username already exists! Try another one",
      });
    }
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

export const LoginUser = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  console.log("tu");
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    usernameOrEmail,
  ]);
  const user = result.rows[0];

  if (!user || user === undefined)
    return res.status(401).json({ ok: false, message: "Invalid email" });

  const valid = await bcrypt.compare(password, user.password);

  if (!valid)
    return res
      .status(401)
      .json({ ok: false, message: "Incorrect email or password" });

  const accessToken = await createAccessToken(user.id);
  const refreshToken = await createRefreshToken(user.id);

  await db.query("UPDATE users SET refreshToken = $1 WHERE id=$2", [
    refreshToken,
    user.id,
  ]);

  const userTEST = await db.query("SELECT * FROM users WHERE id=$1", [user.id]);

  console.log(userTEST.rows[0]);

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

  if (!incomingRefreshToken) {
    return res.json({ ok: false, message: "No refreshToken" });
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.JWT_SECRET_REFRESH_TOKEN
  );

  const userQuery = await db.query(
    "SELECT refreshToken from users WHERE id=$1",
    [decodedToken.id]
  );

  if (userQuery.rowCount == 0) {
    return res.json({ ok: false, message: "Invalid token" });
  }
  if (incomingRefreshToken !== userQuery.rows[0].refreshtoken) {
    return res
      .status(403)
      .json({ ok: false, message: "Refresh token is expired" });
  }

  console.log(decodedToken.id);

  const accessToken = await createAccessToken(decodedToken.id);

  return res.status(200).json({ ok: true, accessToken: accessToken });
};

export const userLogout = async (req, res) => {
  const user_id = req.user.id;

  const user = await db.query("SELECT refreshToken FROM users WHERE id=$1", [
    user_id,
  ]);

  if (user.rowCount === 0) {
    return res.json({ ok: false, message: "This user doesn't exists" });
  }

  console.log(user.rows[0]);
  if (user.rows[0].refreshtoken == null) {
    return res.json({ ok: false, message: "User logged out" });
  }

  await db.query(
    "UPDATE users SET online=FALSE, refreshToken=NULL WHERE id=$1",
    [user_id]
  );

  const userTEST = await db.query("SELECT * FROM users WHERE id=$1", [user_id]);

  console.log(userTEST.rows[0]);
  return res.json({ ok: true, message: "Logged out" });
};
