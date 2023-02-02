import Sequelize from "sequelize";
import sequelize from "../database/sqlDatabase.js";

const Files = sequelize.define("files", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  fileUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  fileName: {
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

export default Files;
