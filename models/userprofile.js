var mongoose = require("mongoose")
var Schema = mongoose.Schema;

//profile schema  
var userProfile =Schema({
first_name:{type:String,default:''},
last_name:{type:String,default:''},
city:{type:String,default:''},
education:{type:String,default:''},
job_profile:{type:String,default:''},
gender:{type:String,default:''},
age:{type:Number,default:''},
address:{type:String,default:''},
contact_no:{type:Number,default:''},  
userID:{type:String,default:''},

created:{type:Date,default:Date.now,index:true}
});
//profile model
mongoose.model("profile" ,userProfile);