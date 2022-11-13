import Users from "../models/user.model.js";
import Cryptr from "cryptr";

export const validateAuth = async (req, res, next) => {
    const isAuth = req.session.auth;
    const cookie = req.cookies["auth"];

    if(cookie){
        const cryptr = new Cryptr("myTotallySecretKey");
        const decryptEmail = cryptr.decrypt(cookie);
        const user = await Users.findOne({ where: {email: decryptEmail} });
        req.user = user 
        return next()   
    }

    if (isAuth){
        const user = await Users.findOne({ where: {id: isAuth} });
        req.user = user 
        return next()   
    }
    res.redirect("/login")
    
};