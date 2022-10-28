import Users from "../models/user.model.js";

export const validateToken = async (req, res, next) => {
    try {
        const token = req.cookies['token'];
        if (!token){
            return res.redirect("/login");
        };

        const user = await Users.findOne({ where: {token: token} });
        if (!user){
            console.log('tokenya tidak valid cui :v');
            return res.redirect("/login");
        };

        req.user = user;

        next();
    }
    catch (error) {
        console.log(error.message);
    };
};