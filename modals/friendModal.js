import Sequelize from "sequelize";
import sequelize from "../database/sqlDatabase.js";

const Friends = sequelize.define("friends", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  }
});

export default Friends;
