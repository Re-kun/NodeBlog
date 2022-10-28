import Users from "../models/user.model.js";

export const signIn = (req, res) => {
    res.render("auth/login");
};

export const signUp = (req, res) => {
    res.render("auth/register");
};

export const register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // validation
        if ( !username || !email || !password || !confirmPassword ) {
            return res.redirect("/register");
        };
        
        if ( password !== confirmPassword ) {
            return res.redirect("/register");
        };

        const user = await Users.findOne({ where: {email: email} });
        if (user) {
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
            return res.redirect("/login");
        }
        
        const user = await Users.findOne({ where: {email:email} });
        if (!user) {
            console.log("gada")
           return res.redirect("/login");
        };

        if (user.password !== password) {
            console.log("g cocok")
           return res.redirect("/login");
        };

        const token = 'ini token :v';
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

    }
    catch (error) {
        console.log(error.message);
    };
};