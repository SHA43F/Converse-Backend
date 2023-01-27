import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/home", (req, res) => {
  res.json({ text: "Heading" });
});

app.listen(5000, () => {
  console.log("Server started running.");
});
