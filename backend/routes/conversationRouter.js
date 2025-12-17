import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createConversation,
  getConversationMessages,
  getConversations,
} from "../controllers/conversations.js";
import { createMessage } from "../controllers/messages.js";

const conversationRouter = express.Router();

conversationRouter.post("/create", auth, createConversation);
conversationRouter.get("/getAllChats", auth, getConversations);
conversationRouter.get("/getMessages", auth, getConversationMessages);
conversationRouter.post("/createMessage", auth, createMessage);
// conversationRouter.post("/create", auth, createConversation);

export default conversationRouter;
