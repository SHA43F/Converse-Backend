import express from "express";
import cors from "cors";

import Users from "./modals/UserModal.js";
import Chat from "./modals/chatModal.js";
import Groups from "./modals/groupModal.js";
import GroupUsers from "./modals/groupUsersModal.js";
import GroupMsgs from "./modals/groupMsgsModal.js";
import GroupAdmins from "./modals/groupAdminModal.js";

import sequelize from "./database/sqlDatabase.js";
import authRouter from "./routes/authRouter.js";
import chatRouter from "./routes/chatRouter.js";
import groupRouter from "./routes/groupRouter.js";
import Friends from "./modals/friendModal.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRouter);
app.use(chatRouter);
app.use(groupRouter);

Users.hasMany(Groups, { foreignKey: "adminId" });
Users.hasMany(Chat);
Groups.belongsToMany(Users, { through: GroupUsers });
Groups.belongsToMany(Users, { through: GroupAdmins });
Users.hasMany(GroupMsgs);
Groups.hasMany(GroupMsgs);
Users.belongsToMany(Users, { as: "friend", through: Friends });

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
