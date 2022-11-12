import Users from "../models/user.model.js";
import bcyrpt from "bcrypt";

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
        
        const isNull = !username || !email || !password || !confirmPassword;
        if (isNull) {
            req.flash("status", "red");
            req.flash("message", "Data tidak boleh kosong");
            return res.redirect("/register");
        }
        
        if ( password !== confirmPassword ) {
            req.flash("status", "red");
            req.flash("message", "Password tidak cocok");
            return res.redirect("/register");
        }

        const user = await Users.findOne({ where: {email: email} });
        if (user) {
            req.flash("status", "red");
            req.flash("message", "Email sudah terdaftar");
            return res.redirect("/register");
        }

        // hash password
        const salt = await bcyrpt.genSalt();
        const hashPassword = await bcyrpt.hash(password, salt);

        // insert to db

        const newUser = {
            username: username,
            email: email,
            password: hashPassword,
            role: "user"
        };

        await Users.create(newUser);
        req.flash("status", "green");
        req.flash("message", "Register berhasil silahkan login");
        res.redirect("/login");


    }
    catch (error) {
        console.log(error.message);
    }
};

export const login = async (req, res) => {
    try {    

        const { email, password } = req.body;

        // validation
        
        if(!email || !password){
            req.flash("status", "red");
            req.flash("message", "Data tidak boleh kosong");
            return res.redirect("/login");
        }
        
        const user = await Users.findOne({ where: {email:email} });
        if (!user) {
            req.flash("status", "red");
            req.flash("message", "Email tidak terdaftar");
            return res.redirect("/login");
        }

        const correctPassword = await bcyrpt.compare(password, user.password)
        if (!correctPassword) {
            req.flash("status", "red");
            req.flash("message", "Password salah");
            return res.redirect("/login");
        }

        //Create session
        req.session.auth = user.id;
        req.session.save()

        res.redirect("/");
    }
    catch (error) {
        console.log(error.message);
    }
};

export const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect("login");
    }
    catch (error) {
        console.log(error.message);
    }
};