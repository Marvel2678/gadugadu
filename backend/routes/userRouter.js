import express from "express";
import {
  GetUser,
  LoginUser,
  RefreshToken,
  RegisterUser,
  UserPushToken,
  // userLogout,
} from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", RegisterUser);
userRouter.post("/login", LoginUser);
// userRouter.post("/logout", userLogout);
userRouter.post("/refreshToken", RefreshToken);
userRouter.get("/me", auth, GetUser);
userRouter.post("/registerPushToken", auth, UserPushToken);
// userRouter.get("/getPushToken", auth, GetPushToken);
userRouter.post("/updatePushToken", auth, UserPushToken);

export default userRouter;
