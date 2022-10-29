import Users from "../models/user.model.js";
import Posts from "../models/post.model.js";

export const indexUser = async (req, res) => {
    try {
       const users = await Users.findAll();
       res.render("dashboard/user", {
            data: users,
            username: req.user.username
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
            username: req.user ? req.user.username : false
        });
        
    }
    catch (error) {
        console.log(error.message);
    };
};

// create
export const createUser = (req, res) => {
    res.render("user/user.create.ejs", {
        username: req.user.username
    });
};

export const storeUser = async (req, res) => {
    try {
        const { username, email,  password, confirmPassword, role } = req.body;

        if (!username || !email || !password || !confirmPassword || !role) {
           return res.redirect("/user/create");
        };

        if(password !== confirmPassword) {
            return res.redirect("/user/create");
        };

        const newUser = {
            username: username,
            email: email,
            password: password,
            role: 'user'
        };

        await Users.create(newUser);
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
            username: req.user.username
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
           return console.log("Berhasil")
        };

        if(result == 0) {
            return console.log("ada yang salah");
        };
    }
    catch (error) {
        console.log(error.message);
    };
}

// delete 
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await Users.destroy({ where: {id: id} });
    }
    catch (error) {
        console.log(error.message);
    };
};

// export const tes = async (req, res) => {
//     try {
//         const data = '';
//         res.send(data);
//     }
//     catch(error) {
//         console.log(error.message);
//     }
// }
