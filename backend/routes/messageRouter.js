import express from "express";
import { auth } from "../middleware/auth.js";
import { createMessage } from "../controllers/messages.js";
import { getConversationMessages } from "../controllers/conversations.js";

const messageRouter = express.Router();

messageRouter.get(
  "/getMessages/:conversation_id",
  auth,
  getConversationMessages
);
messageRouter.post("/create", auth, createMessage);

export default messageRouter;
