import * as Sequelize from "sequelize";

const db = "database_development";
const username = "bob";
const password = null;

export const sequelize = new Sequelize(db, username, password, {
  dialect: "postgres",
  port: 5432
});

sequelize.authenticate();
