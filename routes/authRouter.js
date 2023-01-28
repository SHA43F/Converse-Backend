import express from "express";
import { signInDataPost, signUpDataPost } from "../controllers/authCtrl.js";

const router = express.Router();

router.post("/signUp", signUpDataPost);

router.post("/signIn", signInDataPost);

export default router;
