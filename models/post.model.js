import Users from "./user.model.js";
import { Sequelize } from "sequelize";
import db from "./index.js";

const { DataTypes } = Sequelize;
const Posts = db.define("posts", {
    title: {
        type: DataTypes.STRING
    },
    slug: {
        type: DataTypes.STRING
    },
    body: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
});

Users.hasMany(Posts);
Posts.belongsTo(Users);

export default Posts;