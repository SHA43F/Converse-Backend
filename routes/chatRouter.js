import express from "express";
import { fetchChatData, storeChatData } from "../controllers/chatCtrl.js";

const router = express.Router();

router.post("/chat", storeChatData);

router.get("/chat", fetchChatData);
export default router;
