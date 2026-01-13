import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createConversation,
  getConversations,
} from "../controllers/conversations.js";

const conversationRouter = express.Router();

conversationRouter.post("/create", auth, createConversation);
conversationRouter.get("/getConversations", auth, getConversations);

export default conversationRouter;
