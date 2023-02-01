import Sequelize from "sequelize";
import sequelize from "../database/sqlDatabase.js";

const Friends = sequelize.define("friends", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  // userId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // }
  // friendId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // }
});

export default Friends;
