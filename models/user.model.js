import { Sequelize } from "sequelize";
import db from "./index.js";

const { DataTypes } = Sequelize;
const Users = db.define("users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true
});


export default Users;
