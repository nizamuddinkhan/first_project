var session=require('express-session'),
 express=require('express'),
 app=express();
 var router=express.Router();


  
  userSession={};
  //exporting modules
 module.exports=function(router)
 {
 	router.get('/',userSession.sessionCreate)
 	router.get('/deletesession',userSession.sessionDelete)
 }

 //session
 userSession.sessionCreate = function(req,res){
 	
 	console.log(req.session.data)//////
 	if (req.session.data)
 	{
 		console.log(req.session.data)
 		res.redirect('/api/angular.html');
 		}
 			else
 		{
 			res.redirect('/api/angular.html');
 	}
 }

 // close session
 userSession.sessionDelete=function(req,res)
 {
 	req.session.destroy();
 	res.status(200).json("session logged out");
 	console.log("session closed");
 }