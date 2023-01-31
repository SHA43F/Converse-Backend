import Sequelize from "sequelize";
import sequelize from "../database/sqlDatabase.js";

const Groups = sequelize.define("groups", {
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
    adminUser: {
      type: Sequelize.STRING,
      allowNull: false
    },
  //   totalUsers: {
  //     type: Sequelize.INTEGER
  //   },
  adminId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

export default Groups;
