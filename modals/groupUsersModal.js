import Sequelize from "sequelize";
import sequelize from "../database/sqlDatabase.js";

const GroupUsers = sequelize.define("group-users", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  groupName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default GroupUsers;
