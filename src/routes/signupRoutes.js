const express = require ("express");
const signupRouter = express.Router();
const Userdata = require('../model/Userdata');
signupRouter.use(express.json());
signupRouter.use(express.urlencoded({ extended: true }));


function router(nav){
    signupRouter.get("/",function(req,res){
        res.render("signup",
        {
            nav,
            title:"Sign Up",
            error:""
        });
    });
    signupRouter.post("/",
    async(req,res)=>{

        var password=req.body.password;
        var passRepeat=req.body.passRepeat;
        if(password!=passRepeat){
            res.render("signup",
        {
            nav,
            title:"Sign Up",
            error:"Passwords doesn't match !!!"
        });
        }
        else{
            const {
                username,
                email,
                password
            } = req.body;
            try {
                let user = await Userdata.findOne({
                    email
                });
                if (user) {
                    return res.render("signup",
                    {
                        nav,
                        title:"Sign Up",
                        error:"User already exists"
                    });
                }
            } catch (err) {
                console.log(err.message);
                res.status(500).send("Error in Saving");
            }
                user = new Userdata({
                    username,
                    email,
                    password
                });
                await user.save();
                res.redirect('/login');
        }
    });

            
   
    return signupRouter;
}

module.exports = router;

