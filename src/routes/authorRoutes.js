const express = require ("express");
const authorsRouter = express.Router();
const Authordata = require('../model/Authordata');

function router(nav){
   
    authorsRouter.get("/",function(req,res){
        Authordata.find()
        .then((authors)=>{
             res.render("authors",
        {
            nav,
            navsize:3,
            title:"Library",
            user:'user',
            authors,
            hide:{update:'#',delete:'#'},
            updel:{up:'',del:''}
            
        })
        })
        .catch(function () {
            console.log("Promise Rejected")})
    });
    
    authorsRouter.get("/:id",function(req,res){
        const id =req.params.id;
        Authordata.findOne({_id:id})
        .then((author)=>{
            res.render("author",
        {
            nav,
            navsize:3,
            title:"Library",
            user:'user',
            author
        });
        })
        .catch(function () {
            console.log("Promise Rejected")})
    });
    
 return authorsRouter;
}


module.exports = router;