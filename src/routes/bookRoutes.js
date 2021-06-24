const express = require ("express");
const booksRouter = express.Router();
const Bookdata = require('../model/Bookdata');
function router(nav){
    booksRouter.get("/",function(req,res){
        
        Bookdata.find()
        .then((books)=>{
             res.render("books",
        {
            nav,
            navsize:3,
            title:"Library",
            user:'user',
            books,
            hide:{update:'#',delete:'#'},
            updel:{up:'',del:''}
            
        });
        })
        .catch(function () {
            console.log("Promise Rejected")})
       
    });
    
    booksRouter.get("/:id",function(req,res){
        const id =req.params.id;
        Bookdata.findOne({_id:id})
        .then((book)=>{
            res.render("book",
        {
            nav,
            navsize:3,
            title:"Library",
            user:'user',
            book
        });
        })
        .catch(function () {
            console.log("Promise Rejected")})
        
    });
 return booksRouter;
}


module.exports = router;