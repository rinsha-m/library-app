const express = require ("express");
const mongoose = require('mongoose');
const app = new express;
const port = process.env.PORT || 5000;
mongoose.connect('mongodb+srv://username1:user1@myfiles.d1yi4.mongodb.net/LibraryApp?retryWrites=true&w=majority',{
    useCreateIndex : true,
    useFindAndModify :false,
    useUnifiedTopology: true,
    useNewUrlParser :true
});
const nav=[
    {   link:'/',
        name:'Home'
    },
    {
        link:'/books',
        name:'Book'
    },
    {
        link:'/authors',
        name:'Author'
    },
    {
        link:'/addBook',
        name:'Add Book'
    },
    {
        link:'/addAuthor',
        name:'Add Author'
    }

    ];

const adminRouter = require('./src/routes/adminRoutes')(nav);
const indexRouter = require('./src/routes/indexRoutes')(nav);
const booksRouter = require("./src/routes/bookRoutes")(nav);
const authorsRouter = require("./src/routes/authorRoutes")(nav);
const signupRouter = require("./src/routes/signupRoutes")(nav);
const loginRouter = require("./src/routes/loginRoutes")(nav);
const addAuthorRouter = require("./src/routes/addAuthorRoutes")(nav);
const addBookRouter = require("./src/routes/addBookRoutes")(nav);
const updatebookRouter = require('./src/routes/updatebookRoutes')(nav);
const updateauthorRouter = require('./src/routes/updateauthorRoutes')(nav);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use(express.json());

app.use('/admin',adminRouter);
app.use('/user/',indexRouter);
app.use('/index',indexRouter);
app.use('/user/books',booksRouter);
app.use('/user/authors',authorsRouter);
app.use('/admin/books',booksRouter);
app.use('/admin/authors',authorsRouter);
app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/admin/addAuthor',addAuthorRouter);
app.use('/admin/addBook',addBookRouter);
app.use('/admin/updatebook',updatebookRouter);
app.use('/admin/updateauthor',updateauthorRouter);


app.get("/",function(req,res){
    res.render("home",
    {
        nav,
        title:"Library",
    });
});







app.listen(port,()=>{
    console.log("Server ready at "+ port );
    console.log(' For admin Email:\"admin@library.com\" | Password:\"admin123\"');
});