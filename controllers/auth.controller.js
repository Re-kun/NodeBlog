import Users from "../models/user.model.js";
import crypto from "crypto";

export const signIn = (req, res) => {
    res.render("auth/login",{
        status: req.flash("status"),
        message: req.flash("message")
    });
};

export const signUp = (req, res) => {
    res.render("auth/register", {
        status: req.flash("status"),
        message: req.flash("message")
    });
};

export const register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // validation
        if ( !username || !email || !password || !confirmPassword ) {
            req.flash("status", 'red');
            req.flash("message", 'Data tidak boleh kosong');
            return res.redirect("/register");
        };
        
        if ( password !== confirmPassword ) {
            req.flash("status", 'red');
            req.flash("message", 'Password tidak cocok');
            return res.redirect("/register");
        };

        const user = await Users.findOne({ where: {email: email} });
        if (user) {
           req.flash("status", 'red');
           req.flash("message", 'Email sudah terdaftar');
           return res.redirect("/register");
        };

        // insert to db

        const newUser = {
            username: username,
            email: email,
            password: password,
            role: "user"
        };

        await Users.create(newUser);
        req.flash("status", 'green');
        req.flash("message", 'Register berhasil silahkan login');
        res.redirect("/login");
    }
    catch (error) {
        console.log(error.message);
    };
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // validation
        if(!email || !password){
            req.flash("status", 'red');
            req.flash("message", 'Data tidak boleh kosong');
            return res.redirect("/login");
        }
        
        const user = await Users.findOne({ where: {email:email} });
        if (!user) {
           req.flash("status", 'red');
           req.flash("message", 'Email tidak terdaftar');
           return res.redirect("/login");
        };

        if (user.password !== password) {
           req.flash("status", 'red');
           req.flash("message", 'Password salah');
           return res.redirect("/login");
        };

        // generate token
        const token = crypto.randomBytes(30).toString('hex');
        
        await Users.update({
            token: token
        }, {
            where: {id: user.id}
        });

        res.cookie("token", token);
        res.redirect("/");
    }
    catch (error) {
        console.log(error.message);
    };
};

export const logout = async (req, res) => {
    try {
        // validate
        const token = req.cookies["token"];

        if(!token){
            res.redirect("/login");
        };

        res.clearCookie("token");
        req.flash("status", 'green');
        req.flash("message", 'Logout berhasil');
        res.redirect("login");
    }
    catch (error) {
        console.log(error.message);
    };
};