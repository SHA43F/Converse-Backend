import Sequelize from "sequelize";
import sequelize from "../database/sqlDatabase.js";

const ArchivedChat = sequelize.define("archived", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  toName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  toId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

export default ArchivedChat;
