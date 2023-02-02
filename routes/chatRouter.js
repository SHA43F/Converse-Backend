import express from "express";
import {
  fetchChatData,
  fetchFile,
  sendFile,
  storeChatData
} from "../controllers/chatCtrl.js";

const router = express.Router();

router.post("/chat", storeChatData);

router.get("/chat", fetchChatData);

router.post("/sendFile", sendFile);

router.get("/fetchFile", fetchFile);

export default router;
