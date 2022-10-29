import Posts from "../models/post.model.js";
import Categories from "../models/category.model.js";
import Users from "../models/user.model.js";

// get
export const indexPost = async (req, res) => {
    try{
        const posts = await Posts.findAll({ 
            attributes: [
                "id", "title", "slug", "body"
            ],
            include: {
                all: true,
            }  
        });

        res.render("blog/index", {
            posts: posts
        });
    }
    catch (error){
        console.log(error.message);
    };
};

export const detailPost = async (req, res) => {
    try{
        const id = req.params.id;
        const post = await Posts.findOne({ where: { id: id } });

        !post ? res.redirect("/posts") : 
        
        res.render("blog/detail", {
            post: post
        });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const dashboardPost = async (req, res) => {
    try {
        const userId = req.user.id;
        const posts = await Posts.findAll({ where: { userId : userId } ,attributes: ["id", "title"] });
        res.render("dashboard/post", {
            data: posts 
        });
    }
    catch (error) {
        console.log(error.message);
    };
};

// create
export const createPost = async (req, res) => {
    const categories = await Categories.findAll();
    res.render("blog/post.create.ejs", {
        categories: categories
    });
};

export const storePost = async (req, res) => {
    try{
        const { title, slug, body, categoryId } = req.body;
        const userId = req.user.id;

        if(!title || !slug || !body || !userId || !categoryId){
            return res.redirect("/post/create")
        };
        
        const post = {
            title: title,
            slug: slug,
            body: body,
            userId: userId,
            categoryId: categoryId
        };
        await Posts.create(post);
        res.redirect("/dashboard/post");
    }
    catch (error){
        console.log(error.message);
    };  
};

// delete
export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        await Posts.destroy({ where: {id: id }});
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
    
        res.render("blog/post.edit.ejs", {
            data: post
        });
    }
    catch (error) {
        console.log(error.message);
    };
};

export const updatePost = async (req, res) => {
    try{
        const id = req.params.id;
        const { title, slug, body, userId, categoryId } = req.body;

        if( !title || !slug || !body || userId || categoryId ) {
          return res.redirect("/post/update/" + id);
        };

        const post = {
            title: title,
            slug: slug,
            body: body,
            userId: userId,
            categoryId: categoryId
        };

        await Posts.update(post, {
            where: { id: id } 
        });
    }
    catch (error) {
        console.log(error.message);
    };
};