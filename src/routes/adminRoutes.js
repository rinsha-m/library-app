const express = require ('express');
const adminRouter = express.Router();
const Bookdata = require('../model/Bookdata');
const Authordata = require('../model/Authordata');
adminRouter.use(express.static('./public'));


function router(nav){

    adminRouter.get('/',(req,res)=>{
        res.render("admin",
        {
            nav,
            navsize:5,
            title:'Admin ',
            user:'admin'
        });
    });


    adminRouter.get('/books',(req,res)=>{
        Bookdata.find()
        .then(function(books){
            res.render("books",
            {
            nav,
            navsize:5,
            title:'Books ',
            user:'admin',
            books,
            updel:{up:'Update',del:'Delete'}
            });
        })
        .catch(function () {
            console.log("Promise Rejected")})
    })

    adminRouter.get('/books/:id',(req,res)=>{
        const id = req.params.id;
        Bookdata.findOne({_id: id})
        .then(function(book){
            res.render('book',
            {
            nav,
            navsize:5,
            title:'Book ',
            user:'admin',
            book
            });
        })
        .catch(function () {
            console.log("Promise Rejected")})
    })

    adminRouter.get('/deletebook/:id',(req,res)=>{
        const id = req.params.id;
        Bookdata.deleteOne({_id: id})
        .then(()=>{
            res.redirect("/admin/books");
        })
        .catch(function () {
            console.log("Promise Rejected")})
    })

    adminRouter.get('/authors',(req,res)=>{
        Authordata.find()
        .then(function(authors){
            res.render("authors",
            {
            nav,
            title:'Authors',
            navsize:5,
            user:'admin',
            authors,
            updel:{up:'Update',del:'Delete'}
            });
        })
        .catch(function () {
            console.log("Promise Rejected")})
    })

    adminRouter.get('/authors/:id',(req,res)=>{
        const id = req.params.id;
        Authordata.findOne({_id: id})
        .then(function(author){
            res.render('author',
            {
            nav,
            title:'Author ',
            navsize:5,
            user:'admin',
            author
            });
        })
        .catch(function () {
            console.log("Promise Rejected")})
    })

    adminRouter.get('/deleteauthor/:id',(req,res)=>{
        const id = req.params.id;
        Authordata.deleteOne({_id: id})
        .then(()=>{
                res.redirect("/admin/authors");
      })
      .catch(function () {
        console.log("Promise Rejected")})
    })

    return adminRouter;
}

module.exports = router;