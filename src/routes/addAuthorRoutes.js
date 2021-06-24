const express = require ("express");
const multer = require('multer');
const addAuthorRouter = express.Router();
const Authordata = require('../model/Authordata');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './public/images');
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage,});
function router(nav){
    addAuthorRouter.get("/",function(req,res){
        
        res.render("addAuthor",
        {
            nav,
            title:"Add Author",
        });
    });
    addAuthorRouter.post("/add",upload.single('image'),function(req,res){
        var item = {
            name :req.body.name,
            description: req.body.description,
            image: req.file.originalname
        }
       var author = Authordata(item);
       author.save();
       res.redirect('/admin/authors');

    });

 return addAuthorRouter;
}

module.exports = router;
