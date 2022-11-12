import Users from "../models/user.model.js";

export const validateAuth = async (req, res, next) => {
    const isAuth = req.session.auth;
    
    if (isAuth){
        const user = await Users.findOne({ where: {id: isAuth} });
        req.user = user 
        next()   
    }else{
        res.redirect("/login")
    }
    
};