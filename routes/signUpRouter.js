import express from "express";
import { signUpDataPost } from "../controllers/signUpCtrl.js";
import Users from "../modals/UserModal.js";

const router = express.Router();

router.post("/signUp", signUpDataPost);

export default router;
