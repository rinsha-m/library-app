const express = require ('express');

const indexRouter = express.Router();
indexRouter.use(express.static('./public'));

function router(nav){
    indexRouter.get("/",function(req,res){
        res.render("index",
        {
            nav,
            navsize:3,
            title:"Library",
            user:'user'
        });
    });
    return indexRouter;
}

module.exports = router;