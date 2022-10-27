import Users from "../models/user.model.js";

export const index = async (req, res) => {
    try {
       const users = await Users.findAll();
       res.render("dashboard/user", {
            data: users
       });
    }   
    catch (error){
        console.log(error.message);
    };
};

// create
export const createUser = (req, res) => {
    res.render("user/user.create.ejs");
}

export const storeUser = async (req, res) => {
    try {
        const { name, email,  password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
           return res.redirect("/user/create");
        };

        if(password !== confirmPassword) {
            return res.redirect("/user/create")
        };

        const newUser = {
            name: name,
            email: email,
            password: password
        };

        await Users.create(newUser);
        res.redirect("/dashboard/user")
    }
    catch (error) {
        console.log(error.message);
    };
};

// update 
export const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({ where: {id: id}, attributes: ['id', 'name', 'email'] });
    
        res.render("user/user.edit.ejs", {
            data: user
        });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async (req, res) => {
    try {   
        const id = req.params.id;
        const { name, email } = req.body;

        console.log(name, email)

        const newUser = {
            name: name,
            email: email
        };

        const result = await Users.update(newUser,{
            where: {id: id}
        });

        if(result == 1) {
           return console.log("Berhasil")
        }

        if(result == 0) {
            return console.log("ada yang salah");
        }
    }
    catch (error) {
        console.log(error.message);
    }
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

