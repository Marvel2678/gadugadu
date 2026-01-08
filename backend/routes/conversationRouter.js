import express from "express";
import { auth } from "../middleware/auth.js";
import { createMessage, getMessages } from "../controllers/messages.js";

const conversationRouter = express.Router();

conversationRouter.post("/create", auth, createMessage);
conversationRouter.get("/getMessages", auth, getMessages);

export default conversationRouter;
