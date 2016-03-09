var express=require("express"),
app=express(),
 mongoose = require("mongoose"),
 bodyParser = require("body-parser"),
 profile=mongoose.model("profile");
 

 var profileMethods = {};

 module.exports = function(app){

 app.post("/users/profileUpdate",profileMethods.profileUpdate);	
 app.get("/user/profile" ,profileMethods.show);
}
   
    //midleware
   //user update profile & findone
profileMethods.profileUpdate=function(req,res)
{
      req.checkBody({
      	'address': {notEmpty: true},
      	'city' : {notEmpty: true},
      	'first_name' : {notEmpty:true},
      	'last_name' : {notEmpty:true},
      	'education' : {notEmpty:true},
      	'job_profile' : {notEmpty:true},
      	'gender' : {notEmpty:true},
      	'contact_no' : {notEmpty:true},
           'age' : {notEmpty:true}
     });

      var errors = req.validationErrors();
           if (errors) {
           	   res.send('There have been validation errors:' + errors,200);
           	   return;
           }
             else{

					profile.findOneAndUpdate({userID:req.body.id},
						{$set:{
			 			  first_name:req.body.first_name,
					       last_name:req.body.last_name,
					       city:req.body.city,
					       education:req.body.education,
					       job_profile:req.body.job_profile,
					       gender:req.body.gender,
					       age:req.body.age,
					       address:req.body.address,
					       contact_no:req.body.contact_no}

						}).exec(function(err,data)
				        	{
				        		console.log("data saved")
				        		res.status(200).json("data",data);
				        	})
				}
        
}

profileMethods.show=function(req,res)
  {
  	profile.find({}).exec(function(err,data)
  	 {    
         res.status(200).json("data",data);
  	 })
  	
  }
