const express = require ("express");
const loginRouter = express.Router();
const Userdata = require('../model/Userdata');
loginRouter.use(express.json());
loginRouter.use(express.urlencoded({ extended: true }));

function router(nav){
    loginRouter.get("/",function(req,res){
        res.render("login",
        {
            nav,
            title:"Log In",
             error:"",
        });
     
    });
    loginRouter.post("/",(req,res)=>{
        var vali = {
          email: req.body.email,
          password: req.body.password
        }
        if((vali.email == "admin@library.com")&&(vali.password == "admin123")){
          res.redirect('/admin');
          }
        else{
          Userdata.findOne({email: vali.email, password: vali.password})
          .then(function(userdata){
              if(userdata != null){
                  res.redirect('/user');
              }
              else{
                return res.render("login",
                  {
                      nav,
                      title:"Log In",
                      error:"Invalid Login",
                  });
              };
          })
          .catch(function () {
            console.log("Promise Rejected")})
          }
      });
    return loginRouter;
}
module.exports = router;
