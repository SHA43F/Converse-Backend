import Sequelize from "sequelize";

const sequelize = new Sequelize("group-chat", "root", "Sqlroot@1", {
  host: "localhost",
  dialect: "mysql"
});


export default sequelize;
