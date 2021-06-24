const express = require('express');
const multer = require('multer');
const updatebookRouter = express.Router();
const Bookdata = require('../model/Bookdata');
updatebookRouter.use(express.static('./public'));

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
    
    updatebookRouter.get('/:id',(req,res)=>{
        const id = req.params.id;
        Bookdata.findOne({_id:id})
        .then((book)=>{
        res.render("updatebook",
        {
            nav,
            title:'Update Book ',
            id,
            book
        });
    })
    .catch(function () {
        console.log("Promise Rejected")})
    });

    updatebookRouter.post('/:id/up',upload.single('image'),(req,res)=>{
        const id = req.params.id;
        var update = {
            title : req.body.title,
            author :req.body.author,
            genre:req.body.genre,
            description: req.body.description,
            image: req.file.originalname
        }
        Bookdata.findByIdAndUpdate({_id: id},update,()=>{
            res.redirect('/admin/books');
        });
    });

    return updatebookRouter;
}

module.exports = router;