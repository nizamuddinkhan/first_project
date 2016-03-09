var session=require('express-session'),
 express=require('express'),
 app=express();


  userSession={};
  //exporting modules
 module.exports=function(app)
 {
 	app.get('/',userSession.sessionCreate)
 	app.get('/deletesession',userSession.sessionDelete)
 }

 //session
 userSession.sessionCreate = function(req,res){
 	
 	console.log(req.session.data)//////
 	if (req.session.data)
 	{
 		console.log(req.session.data)
 		res.json("In Session")
 		}
 			else
 		{
 			res.json("Not in Session")
 	}	
 }

 // close session
 userSession.sessionDelete=function(req,res)
 {
 	req.session.destroy();
 	res.status(200).json("session logged out");
 	console.log("session closed");
 }