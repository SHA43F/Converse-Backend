import Sequelize from "sequelize";
import sequelize from "../database/sqlDatabase.js";

const GroupAdmins = sequelize.define("group-admins", {
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

  adminName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export default GroupAdmins;
