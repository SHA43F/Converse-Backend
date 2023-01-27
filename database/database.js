import Sequelize from "sequelize";

const sequelize = Sequelize.define("group-chat", "root", "Sqlroot@1", {
  host: "localhost",
  dialect: "mysql"
});

export default sequelize;
