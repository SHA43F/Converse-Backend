import Sequelize from "sequelize";
import sequelize from "../database/sqlDatabase.js";

const Chat = sequelize.define("chats", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default Chat;
