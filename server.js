import express from "express";
import cors from "cors";
// import { CronJob } from "cron";

import Users from "./modals/UserModal.js";
import Chat from "./modals/chatModal.js";
import Groups from "./modals/groupModal.js";
import GroupUsers from "./modals/groupUsersModal.js";
import GroupMsgs from "./modals/groupMsgsModal.js";
import GroupAdmins from "./modals/groupAdminModal.js";
import Friends from "./modals/friendModal.js";

import sequelize from "./database/sqlDatabase.js";
import authRouter from "./routes/authRouter.js";
import chatRouter from "./routes/chatRouter.js";
import groupRouter from "./routes/groupRouter.js";
import FriendsRouter from "./routes/freindsRouter.js";
import Files from "./modals/fileSharingModal.js";
import ArchivedChat from "./modals/archivedChatModal.js";

const app = express();

// var Job = new CronJob({
//   cronTime: "00 00 00 * * * ",
//   onTick: async () => {
//     console.log("This runs every midnight");
//     const chatData = await Chat.findAll();
//     const chatArray = chatData.map((chat) => chat.dataValues);
//     const response = ArchivedChat.bulkCreate(chatArray);
//   },
//   start: true,
//   runOnInit: true
// });
// Job.start();


app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRouter);
app.use(chatRouter);
app.use(groupRouter);
app.use(FriendsRouter);

Users.hasMany(Groups, { foreignKey: "adminId" });
Users.hasMany(Chat);
Users.hasMany(ArchivedChat);
Users.hasMany(Files);
Groups.belongsToMany(Users, { through: GroupUsers });
Groups.belongsToMany(Users, { through: GroupAdmins });
Users.hasMany(GroupMsgs);
Groups.hasMany(GroupMsgs);
Users.belongsToMany(Users, {
  through: Friends,
  as: "friendsList",
  foreignKey: "userId",
  otherKey: "friendId"
});

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
