import express from "express";

const router = express.Router();

const chatArray = [];

router.post("/chat", (req, res) => {
  const data = req.body;
  chatArray.push(data);
  res.status(200).send(chatArray);
});

export default router;
