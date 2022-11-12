import { Sequelize } from "sequelize";
import config from "../config/db.config.js";

const { username, password, database, host, dialect } = config.devlopment;
const db = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect 
});

export default db;