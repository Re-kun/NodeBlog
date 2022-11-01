import Categories from "../models/category.model.js";
import Posts from "../models/post.model.js";

export const indexCategory = async (req, res) => {
    try {
        const categories = await Categories.findAll({ attributes: [ "id", "name", "slug"] });
        res.render("dashboard/category", {
            data: categories,
            username: req.user ? req.user.username : false,
            status: req.flash("status"),
            message: req.flash("message")
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
export const createCategory = (req, res) => {
    res.render("category/category.create.ejs", {
        username: req.user ? req.user.username : false,
        status: req.flash("status"),
        message: req.flash("message")
    });
};

export const storeCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;

        if(!name || !slug){
            req.flash("status", 'red');
            req.flash("message", 'Data tidak boleh kosong');
            return res.redirect("/category/create");
        };

        const newCategory = {
            name: name,
            slug: slug
        };

        await Categories.create(newCategory);
        req.flash("status", 'green');
        req.flash("message", 'Category berhasil di tambahkan');
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
            username: req.user ? req.user.username : false,
            status: req.flash("status"),
            message: req.flash("message")
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

        if( !name || !slug ) {
            req.flash("status", 'red');
            req.flash("message", 'Data tidak boleh kosong');
            return res.redirect("/category/edit/" + id);
          };

        const newData = {
            name: name,
            slug: slug
        };

        const result = await Categories.update(newData, { 
            where: {id: id}  
        });

        if(result == 1) {
            console.log("berhasil");
            req.flash("status", 'green');
            req.flash("message", 'Data category berhasil di update');
        } else {
            req.flash("status", 'red');
            req.flash("message", 'Tidak dapat mengupdate data category dengan id ' + id);
        };
        
        res.redirect("/dashboard/category");
    }
    catch (error) {
        console.log(error.message);
    };
};

// delete
export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Categories.destroy({ where: {id: id} });

        if(result == 1){
            req.flash("status", 'green');
            req.flash("message", 'Category berhasil dihapus');
        } else {
            req.flash("status", 'red');
            req.flash("message", 'Tidak bisa menghapus category dengan id ' + id);
        };

        res.redirect("/dashboard/category");
    }
    catch (error) {
        console.log(error.message);
    };
};

