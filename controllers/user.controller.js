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
    };
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
    };
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
        const { username, email,  password, confirmPassword, role } = req.body;

        if (!username || !email || !password || !confirmPassword || !role) {
           req.flash("status", 'red');
           req.flash("message", 'Data tidak boleh kosong');
           return res.redirect("/user/create");
        };

        if(password !== confirmPassword) {
            req.flash("status", 'red');
            req.flash("message", 'Password tidak cocok');
            return res.redirect("/user/create");
        };

        const newUser = {
            username: username,
            email: email,
            password: password,
            role: 'user'
        };

        await Users.create(newUser);
        req.flash("status", 'green');
        req.flash("message", 'User berhasil di tambahkan');
        res.redirect("/dashboard/user");
    }
    catch (error) {
        console.log(error.message);
    };
};

// update 
export const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({ where: {id: id}, attributes: ['id', 'username', 'email', 'role'] });
    
        res.render("user/user.edit.ejs", {
            data: user,
            username: req.user ? req.user.username : false,
            status: req.flash("status"),
            message: req.flash("message")
        });
    }
    catch (error) {
        console.log(error.message);
    };
};

export const updateUser = async (req, res) => {
    try {   
        const id = req.params.id;
        const { username, email, role } = req.body;

        const newUser = {
            username: username,
            email: email,
            role: role
        };

        const result = await Users.update(newUser,{
            where: {id: id}
        });

        if(result == 1) {
           req.flash("status", 'green');
           req.flash("message", 'Data user berhasil diupdate');
        } else {
            req.flash("status", 'red');
            req.flash("message", 'tidak dapat mengupdate data user dengan id ' + id);
            return res.redirect("/user/edit/" + id);
        };

        res.redirect("/dashboard/user");
    }
    catch (error) {
        console.log(error.message);
    };
}

// delete 
export const deleteUser = async (req, res) => {
    try {
         const id = req.params.id;
         const result = await Users.destroy({ where: {id: id} });

         if (result == 1 ){
             await Posts.destroy({where: {userId: id} });
             req.flash("status", 'green');
             req.flash("message", 'User berhasil dihapus');
        } else {
            req.flash("status", 'red');
            req.flash("message", 'tidak dapat menghapus data user dengan id ' + id);
        };

        res.redirect("/dashboard/user");
    }
    catch (error) {
        console.log(error.message);
    };
};
