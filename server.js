import express from "express";
import cors from "cors";
import sequelize from "./database/sqlDatabase.js";
import authRouter from "./routes/authRouter.js"
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/home", (req, res) => {
  res.json({ text: "Heading" });
});

app.use(authRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
