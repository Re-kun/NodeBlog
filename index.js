// package
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";


//config express
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// models
import db from "./models/index.js";
// import Users from './models/user.model.js';
// import Posts from "./models/post.model.js";
// import Categories from './models/category.model.js';
// routes
import IndexRouter from "./routes/index.route.js";
import DashboardRouter from "./routes/dashboard.route.js";
import AuthRouter from "./routes/auth.route.js";


// setup variabel module
const app = express();

// setup module
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}
));
app.use(cookieParser("secret"));
app.use(flash());

// db sync 
try {
    await db.authenticate();
    // await Users.sync();
    // await Categories.sync();
    // await Posts.sync();
    console.log("database connected")
}catch (err) {
    console.log(err.message);
}

// Route
app.use(AuthRouter); 
app.use(DashboardRouter);
app.use(IndexRouter);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("*", (req, res) => {
    res.render("404");
})

// Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});