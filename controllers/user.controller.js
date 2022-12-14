import Users from "../models/user.model.js";
import Posts from "../models/post.model.js";

export const indexUser = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.render("dashboard/user", {
            data: users,
            username: req.user ? req.user.username : false,
            status: req.flash("status"),
            message: req.flash("message")
        });
    }   
    catch (error){
        console.log(error.message);
    }
};

export const postUser = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await Users.findOne({ where: {username: username} });
        const posts = await Posts.findAll({ 
            where: { userId: user.id},
            include: { all: true }
        });

        res.render("blog/index", {            
            posts: posts,
            username: req.user ? req.user.username : false,
            status: req.flash("status"),
            message: req.flash("message") 
        });
        
    }
    catch (error) {
        console.log(error.message);
    }
};

// create
export const createUser = (req, res) => {
    res.render("user/user.create.ejs", {
        username: req.user ? req.user.username : false,
        status: req.flash("status"),
        message: req.flash("message")
    });
};

export const storeUser = async (req, res) => {
    try {
        const { username, email,  password, confirmPassword } = req.body;
        
        //validate

        const isNull = !username || !email || !password || !confirmPassword ;
        if (isNull) {
            req.flash("status", "red");
            req.flash("message", "Data tidak boleh kosong");
            return res.redirect("/user/create");
        }

        const user = await Users.findOne({ where: {email: email} });

        if (user) {
            req.flash("status", "red");
            req.flash("message", "Email sudah di pakai");
            return res.redirect("/user/create");
        }

        if(password !== confirmPassword) {
            req.flash("status", "red");
            req.flash("message", "Password tidak cocok");
            return res.redirect("/user/create");
        }

        const newUser = {
            username: username,
            email: email,
            password: password
        };

        await Users.create(newUser);
        req.flash("status", "green");
        req.flash("message", "User berhasil di tambahkan");
        res.redirect("/dashboard/user");
    }
    catch (error) {
        console.log(error.message);
    }
};

// update 
export const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({ where: {id: id}, attributes: ["id", "username", "email"] });
    
        res.render("user/user.edit.ejs", {
            data: user,
            username: req.user ? req.user.username : false,
            status: req.flash("status"),
            message: req.flash("message")
        });
    }
    catch (error) {
        console.log(error.message);
    }
};

export const updateUser = async (req, res) => {
    try {   
        const id = req.params.id;
        const { username, email } = req.body;

        // validate
        
        const isNull = !username || !email;
        if(isNull) {
            req.flash("status", "red");
            req.flash("message", "Data tidak boleh kosong");
            return res.redirect("/user/edit/" + id);
        }

        const newUser = {
            username: username,
            email: email,
        };

        const result = await Users.update(newUser,{
            where: {id: id}
        });

        if(result == 1) {
            req.flash("status", "green");
            req.flash("message", "Data user berhasil diupdate");
        } else {
            req.flash("status", "red");
            req.flash("message", `Tidak bisa mengupdate user dengan id ${id}`);
        }

        res.redirect("/dashboard/user");
    }
    catch (error) {
        console.log(error.message);
    }
}

// delete 
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await Posts.destroy({ where: {userId: id} });
        const result = await Users.destroy({ where: {id: id} });
         
        if (result == 1 ){
            req.flash("status", "green");
            req.flash("message", "User berhasil dihapus");
        } else {
            req.flash("status", "red");
            req.flash("message", `Tidak bisa menghapus user dengan id ${id}`);
        }

        res.redirect("/dashboard/user");
    }
    catch (error) {
        console.log(error.message);
    }
};
