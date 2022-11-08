export const validateAuth = (req, res, next) => {
    const token = req.cookies["token"];
    token ? res.redirect("/") : next();  

    // console.log(req.session.ikan)
    // next()
};