import Sequelize from "sequelize";
import "dotenv/config";


const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: "mysql"
});


export default sequelize;


// DATABASE_NAME = 
// DATABASE_HOST = 
// DATABASE_USERNAME = 
// DATABASE_PASSWORD = 