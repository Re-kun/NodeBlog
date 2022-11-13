import Posts from "../models/post.model.js";
import Categories from "../models/category.model.js";

// get
export const indexPost = async (req, res) => {
    try{
        const posts = await Posts.findAll({ 
            attributes: [
                "id", "title", "slug", "body", "image"
            ],
            include: {
                all: true,
            }  
        });
        
        res.render("blog/index", {
            posts: posts,
            username: req.user ? req.user.username : false,
            status: req.flash("status"),
            message: req.flash("message")
        });

    }
    catch (error){
        console.log(error.message);
    }
};

export const detailPost = async (req, res) => {
    try{
        const id = req.params.id;
        const post = await Posts.findOne({ where: { id: id } });

        !post ? res.redirect("/posts") : res.render("blog/detail", {
            post: post,
            username: req.user ? req.user.username : false,
            status: req.flash("status"),
            message: req.flash("message")
        });
    }
    catch (error) {
        console.log(error.message);
    }
};

export const searchPost = async (req, res) => {
    try {
        if(!req.query.title){
            return res.redirect("/posts");
        }

        const posts = await Posts.findAll({ 
            where: {title:  req.query.title }, 
            include: { all: true },
            attributes: [
                "id", "title"
            ] 
        });
        
        res.render("blog/index", {
            posts: posts,
            username: req.user ? req.user.username : false
        });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const dashboardPost = async (req, res) => {
    try {
        const userId= req.user.id;
        const posts = await Posts.findAll({ where: { userId : userId } ,attributes: ["id", "title"] });

        res.render("dashboard/post", {
            data: posts,
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
export const createPost = async (req, res) => {

    const categories = await Categories.findAll();
    res.render("blog/post.create.ejs", {
        categories: categories,
        username: req.user ? req.user.username : false,
        status: req.flash("status"),
        message: req.flash("message")
    });
};

export const storePost = async (req, res) => {
    try{

        const { title, slug, body, categoryId } = req.body;
        const image = req.file;
        const userId= req.user.id;

        // validate 
        const isNull = !title || !slug || !body || !userId || !categoryId || !image;
        if(isNull){
            req.flash("status", "red");
            req.flash("message", "Data tidak boleh kosong");
            return res.redirect("/post/create");
        }
        
        const post = {
            title: title,
            slug: slug,
            body: body,
            userId: userId,
            categoryId: categoryId,
            image: image.filename
        };

        await Posts.create(post);
        req.flash("status", "green");
        req.flash("message", "Post berhasil dibuat");
        res.redirect("/dashboard/post");
    }
    catch (error){
        req.flash("status", "red");
        req.flash("message", error.message);
        res.redirect("/post/create");
    } 
};

// delete
export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Posts.destroy({ where: {id: id }});

        if( result == 1) {
            req.flash("status", "green");
            req.flash("message", "Data post berhasil dihapus");
             
        }else{
            req.flash("status", "red");
            req.flash("message", `Tidak bisa menghapus post dengan id ${id}`);
        }
     
        res.redirect("/dashboard/post");
    }   
    catch (error) {
        console.log(error.message);
    }
}

// update
export const editPost = async (req, res) => {
    try{
        const id = req.params.id;
        const post = await Posts.findOne({ where: {id: id}, attributes: ["id", "title", "slug", "body", "userId", "categoryId"] });
        const categories = await Categories.findAll();
    
        res.render("blog/post.edit.ejs", {
            categories: categories,
            data: post,
            username: req.user ? req.user.username : false,
            status: req.flash("status"),
            message: req.flash("message")
        });
    }
    catch (error) {
        console.log(error.message);
    }
};

export const updatePost = async (req, res) => {
    try{
        const id = req.params.id;
        const userId = req.user.id;
        const { title, slug, body, categoryId } = req.body;
        let image = req.file;

        // validate 

        const isNull = !title || !slug || !body || !userId || !categoryId;
        if(isNull) {
            req.flash("status", "red");
            req.flash("message", "Data tidak boleh kosong");
            return res.redirect("/post/edit/" + id);
        }

        image ? image = image.filename : image
        const post = {
            title: title,
            slug: slug,
            body: body,
            image:image,
            userId: userId,
            categoryId: categoryId
        };

        const result = await Posts.update(post, {
            where: { id: id } 
        });

        if( result == 1) {
            req.flash("status", "green");
            req.flash("message", "Data post berhasil diupdate");
        } else {
            req.flash("status", "red");
            req.flash("message", `Tidak bisa mengupdate post dengan id ${id}`);
        }

        res.redirect("/dashboard/post");
       
    }
    catch (error) {
        req.flash("status", "red");
        req.flash("message", error.message);
        return res.redirect("/post/edit/" + req.params.id);

    }
};