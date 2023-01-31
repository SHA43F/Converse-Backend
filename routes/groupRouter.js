import express from "express";
import {
  addGroupMember,
  createGroup,
  fetchGroupMembers,
  fetchGroups,
  fetchGroupMessages,
  sendGroupMessage
} from "../controllers/groupCtrl.js";

const router = express.Router();

router.post("/createGroup", createGroup);

router.get("/fetchGroups", fetchGroups);

router.post("/addGroupMember", addGroupMember);

router.post("/sendGroupMessage", sendGroupMessage);

router.get("/fetchGroupMessages", fetchGroupMessages);

router.get("/fetchGroupMembers", fetchGroupMembers);

export default router;
