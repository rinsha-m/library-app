const express = require ("express");
const multer = require('multer');
const addBookRouter = express.Router();
const Bookdata = require('../model/Bookdata');

const storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './public/images');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
    }  
  });  
const upload = multer({ storage : storage,}); 


function router(nav){
    addBookRouter.get("/",function(req,res){
        res.render("addBook",
        {
            nav,
            title:"Add Book",
        });
    });
    addBookRouter.post("/add",upload.single('image'),function(req,res){
        var item = {
            title : req.body.title,
            author :req.body.author,
            genre:req.body.genre,
            description: req.body.description,
            image: req.file.originalname
        }
       var book = Bookdata(item);
       book.save();
       res.redirect('/admin/books');

    });

    return addBookRouter;
}


module.exports = router;
