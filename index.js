// package
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
// models
import db from "./models/index.js";
import Users from "./models/user.model.js";
import Posts from "./models/post.model.js";
import Categories from "./models/category.model.js";
// routes
import UserRouter from "./routes/user.route.js";
import PostRouter from "./routes/post.route.js";
import AuthRouter from "./routes/auth.route.js";
import CategoryRouter from "./routes/category.route.js";

const app = express();

// setup module
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// db sync
try {
    await db.authenticate();
    // await Users.sync();
    // await Categories.sync();
    await Posts.sync();
    console.log("database connected")
}catch (err) {
    console.log(err.message);
}

// Route
app.use(AuthRouter); 
app.use(UserRouter);
app.use(PostRouter);
app.use(CategoryRouter);

app.get("/", (req, res) => {
    res.render("index");
});


// Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});