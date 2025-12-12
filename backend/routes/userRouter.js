import express from "express";
import {
  GetUser,
  LoginUser,
  RefreshToken,
  RegisterUser,
} from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", RegisterUser);
userRouter.post("/login", LoginUser);
userRouter.post("/refreshToken", RefreshToken);
userRouter.get("/me", auth, GetUser);

export default userRouter;
