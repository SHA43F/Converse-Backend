import express from "express";
import { addFriend, fetchFriendsList } from "../controllers/friendsCtrl.js";

const router = express.Router();

router.get("/fetchFriendsList", fetchFriendsList);

router.post("/addFriend", addFriend);

export default router;
