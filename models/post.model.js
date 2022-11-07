import Users from "./user.model.js";
import Categories from "./category.model.js";
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
    },
    Image: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

Users.hasMany(Posts);
Posts.belongsTo(Users);

Categories.hasMany(Posts);
Posts.belongsTo(Categories);
export default Posts;