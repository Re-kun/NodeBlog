import Categories from "../models/category.model.js";
import Posts from "../models/post.model.js";

export const indexCategory = async (req, res) => {
    try {
        const categories = await Categories.findAll({ attributes: [ "id", "name", "slug"] });
        res.render("dashboard/category", {
            data: categories,
            username: req.user.username
        });
    }
    catch (error) {
        console.log(error.message);
    };
};

export const postCategory = async (req, res) => {
    try {
        const slug = req.params.slug;
        const category = await Categories.findOne({ where: {slug: slug} });
        const posts = await Posts.findAll({ 
            where: { categoryId: category.id},
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
export const createCategory = (req, res) => {
    res.render("category/category.create.ejs", {
        username: req.user.username
    });
};

export const storeCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;

        if(!name || !slug){
            res.redirect("/category/create");
        };

        const newCategory = {
            name: name,
            slug: slug
        };

        await Categories.create(newCategory);
        res.redirect("/dashboard/category");
    }
    catch (error) {
        console.log(error.message);
    };
};

// update
export const editCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Categories.findOne({ where: {id: id} });
        
        res.render("category/category.edit.ejs", {
            data: category,
            username: req.user.username
        });
    }
    catch (error) {
        console.log(error.message);
    };
};

export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, slug } = req.body;

        const newData = {
            name: name,
            slug: slug
        };

        const result = await Categories.update(newData, { 
            where: {id: id}  
        });

        if(result == 1) {
            console.log("berhasil");
        };

        if(result == 0) {
            console.log("ada yang salah ");
        };
    }
    catch (error) {
        console.log(error.message);
    };
};

// delete
export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        await Categories.destroy({ where: {id: id} });
    }
    catch (error) {
        console.log(error.message);
    };
};

