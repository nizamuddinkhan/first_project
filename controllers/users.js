var express=require("express"),
app=express(),
router=express.Router(),
 mongoose = require("mongoose"),
 bodyParser = require("body-parser"),
 crypto=require("crypto"),
 uuid=require('uuid'), 
 UserPost=mongoose.model("UserPost"),
 commentPost=mongoose.model("commentPost"),
 User=mongoose.model("user");

 profile=mongoose.model("profile");//call profile model from usersprofile
  
var userMethods = {};

  

module.exports = function(router){


  router.post('/user',userMethods.create);
  router.get('/users',userMethods.show);
  router.post('/login',userMethods.login);
  router.post("/users/passwordreset",userMethods.passwordReset);
  router.post("/users/updatepassword",userMethods.updatePassword);
  router.post("/users/delete",userMethods.removeUser);
  router.get("/logout",userMethods.logout);

  //app.post('/users/forgot_password',userMethods.forgot_password)
}


//midleware
//post new user
 userMethods.create=function(req,res) 
{

     var username=req.body.username;
     var password=req.body.password;
     var emailID=req.body.emailID;
     var answer=req.body.answer;

      var salt=Math.round(new Date().valueOf()*Math.random())+'';
      var hash=crypto.createHmac('sha256',salt);
      var hashedPassword=hash.update(password).digest('hex');

      var newUser=new User({
        username:username,
        emailID:emailID,
        salt:salt,
        hashedPassword:hashedPassword,
        answer:answer

      });
         //new profile for user
        

           console.log(newUser)

     newUser.save(function(err,data)
       {

        var newprofile=new profile
        ({
          userID:newUser._id
        })
            
        newprofile.save(function(err,data)

        {
          console.log("newUserid is saved")
          res.status(800).send(data);
        })
        

          
      });

};


 //get users
 userMethods.show=function(req,res)
 
{

//header use for get,post angular.html file
res.header("Access-Control-Allow-Origin","http://localhost");

res.header("Access-Control-Allow-Methods","GET, POST");  
 

  User.find({}).limit(20).skip(0).exec(function(err,data)
  {
    console.log(data)
    console.log(data.length)
    res.status(200).json(data);
  });
};


//user login
userMethods.login=function(req,res)
{
var userPassword=req.body.password;

   console.log("username=name",req.body.username)
           if(!req.session.data)//session in process
           {
                       User.findOne({username:req.body.username}).exec(function(err,data)  
                       {
                    
                       if (err) throw err;
           
                       if (!data) {
                         res.send(200,"no data found");
                        }  
                       else  {
           
                          
                          console.log("login",data._id); 
                          req.session.data=data;//data in session
                          var id=data.id; 
           
                          var hash = crypto.createHmac('sha256', data.salt);
                          userHash= hash.update(userPassword).digest('hex');
           
                             console.log("salt",data.salt);
                           console.log("username",data.username);
                         
                           console.log("userHash",userHash);
                           console.log("data.hashedPassword",data.hashedPassword);
           
                         if (data.hashedPassword != userHash) {
                              res.send(200,"Wrong password");
                           }
                           else
                           {
                             res.send(200,data)
                           }
                         } 
                       })
            }
            else{
                  res.send("some body logged in")
            }


   } 

     //passwordReset
   userMethods.passwordReset=function(req,res,next)
{
  console.log('username',req.body.username)

  User.findOne({username:req.body.username}).exec(function(err,data)
  {
    var answer=req.body.answer;
    console.log('answer',answer);
    if(!data)
    {
      res.status(200).json("Can't find the person you are looking for!");
    }
    else
    {
      var id=data._id;
      if (data.answer!=answer) 
      {
        res.status(200).json("Authentication failed. Wrong answer.");        
      }

      else {

        var token = uuid.v4(); //token generate by uuid
        User.findOneAndUpdate({_id:data._id},{$set:{token:token}}).exec(function(err,data)
        {
        console.log("token saved")
        })
        res.status(200).json("token",token);
      }
    }    
  })
 } 

//delete/remove user
userMethods.removeUser=function(req,res)
{
  var id=req.body.id;
  console.log('id',id)

  User.remove({_id:id}).exec(function(err,data)
  {

    profile.remove({UserID:id}).exec(function(err,data)
    {

      UserPost.remove({postID:id}).exec(function(err,data)
      {

        commentPost.remove({commentID:data._id}).exec(function(err,data)
        {

          console.log("user removed");
          res.status(200).json("user is removed");
        })

      })

    })

  })

}

//closed  session
userMethods.logout=function(req,res)
{
  if(req.session.data)
  {
    req.session.destroy();
    console.log("logged out");
    res.status(200).json("user logged out");
  }
  else
  {
    res.status(200).json("No user logged in")
  }
}


 

//update password
userMethods.updatePassword=function(req,res)
{
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token;

    var password=req.body.password;
    var id=req.body.id;
    console.log('password',password)
  User.findOne({_id:id}).exec(function(err,data)
    {
      if(token==data.token)
      {
        var salt = Math.round(new Date().valueOf() * Math.random()) + '';
        var hash = crypto.createHmac('sha256', salt);
        var hashedPassword= hash.update(password).digest('hex');

    
      User.findOneAndUpdate({_id:data.id},{$set:{salt:salt,hashedPassword:hashedPassword}}).exec(function(err,data)
        {
          console.log('password changed')
          res.json("Password:Changed")
        })
      }
        else
        {
          res.json("Wrong Token");
        }

     })
};



     




 //userMethods.forgot_password = function(req,res){
  
 //}