import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createConversation,
  getConversations,
  searchUsers,
} from "../controllers/conversations.js";

const conversationRouter = express.Router();

conversationRouter.post("/create", auth, createConversation);
conversationRouter.get("/getConversations", auth, getConversations);
conversationRouter.get("/users/search", auth, searchUsers);

export default conversationRouter;
