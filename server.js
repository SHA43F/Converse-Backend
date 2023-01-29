import express from "express";
import cors from "cors";
import sequelize from "./database/sqlDatabase.js";
import authRouter from "./routes/authRouter.js";
import chatRouter from "./routes/chatRouter.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRouter);
app.use(chatRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
