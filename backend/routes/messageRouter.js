import express from "express";
import { auth } from "../middleware/auth.js";
import { createMessage, getMessages } from "../controllers/messages.js";
import { getConversationMessages } from "../controllers/conversations.js";

const messageRouter = express.Router();

messageRouter.get("/getMessages/:conversation_id", auth, getMessages);
messageRouter.post("/create", auth, createMessage);

export default messageRouter;
