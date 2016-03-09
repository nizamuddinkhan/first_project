var mongoose = require("mongoose")
var Schema = mongoose.Schema;

  //user schema
var userSchema =Schema({
username:{type:String,default:'',index:{unique:true}},
emailID:{type:String,default:'',index:{unique:true}},
salt:{type:String,default:''},
hashedPassword:{type:String,default:''},
answer:{type:String,default:''},
token:{type:String,default:''},

created:{type:Date,default:Date.now,index:true}
});
//schema model
mongoose.model("user" ,userSchema);

