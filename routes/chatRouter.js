import express from "express";
import {
  fetchChatData,
  sendFile,
  storeChatData
} from "../controllers/chatCtrl.js";

const router = express.Router();

router.post("/chat", storeChatData);

router.get("/chat", fetchChatData);

router.post("/sendFile", sendFile);

export default router;
