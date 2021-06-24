const express = require('express');
const multer = require('multer');
const updateauthorRouter = express.Router();
const Authordata = require('../model/Authordata');
updateauthorRouter.use(express.static('./public'));


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

    updateauthorRouter.get('/:id',(req,res)=>{
        const id = req.params.id;
        Authordata.findOne({_id:id})
        .then((author)=>{
        res.render("updateauthor",
        {
            nav,
            title:'Update Author',
            id,
            author
        });
    })
    .catch(function () {
        console.log("Promise Rejected")})
    });

    updateauthorRouter.post('/:id/up',upload.single('image'),(req,res)=>{
        const id = req.params.id;
        var update = {
            name :req.body.name,
            description: req.body.description,
            image: req.file.originalname
        }
        Authordata.findByIdAndUpdate({_id: id},update,()=>{
            res.redirect('/admin/authors');
        });
    });

    return updateauthorRouter;
}

module.exports = router;