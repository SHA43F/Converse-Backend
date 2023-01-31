import Sequelize from "sequelize";
import sequelize from "../database/sqlDatabase.js";

const GroupMsgs = sequelize.define("group-messages", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  },
  groupName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  groupId: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default GroupMsgs;
