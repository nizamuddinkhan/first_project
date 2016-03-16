var express=require("express"),
app=express(),
 router=express.Router(),
 mongoose = require("mongoose"),
 bodyParser = require("body-parser"),
 profile=mongoose.model("profile"),
 UserPost=mongoose.model("UserPost"),
 commentPost=mongoose.model("commentPost");
  
  var userPost= {};

  
  module.exports = function(router){


         router.post('/post',userPost.upPost);
         router.post('/postLike',userPost.PLike);
         router.get('/showpost',userPost.SPost);
         router.post('/postcomment',userPost.UComment);
         router.get('/showcomment',userPost.SComment);
         router.post('/commentLike',userPost.CLike);

     }

 userPost.upPost=function(req,res)
 {
 	if(req.session.data)
 	{
 		var postBody=req.body.postBody;
 		var sessionid=req.session.data._id;
 		console.log("session",sessionid);

 		var newPost=new UserPost
 		({
 			   postID:sessionid,
 			   postBody:postBody

 		}) 
 		
 		newPost.save(function(err,data)
         {
         	console.log("new post created");
         	   res.status(200).json(data);
         })

 	}
 	else
 	{
 		console.log("post not executed");
 		res.status(200).json("no user logged in");
 	}

}

userPost.PLike=function(req,res)
{
    UserPost.findOneAndUpdate({postID:req.body.id},{$push:{postLike:req.body.postLike}},function(err,data)
    {
     console.log("Liked",data.postLike.length); 
	 console.log("you liked the post");
	 var u=status(200).json("no.of users that like the Post"*''*u);
	})
}

userPost.SPost=function(req,res)
{
	UserPost.find({}).exec(function(err,data)
	{
		res.status(200).json(data);
	})	
}

userPost.UComment=function(req,res)
{
	UserPost.find({postID:req.body.id}).exec(function(err,data)
	{
		var newCommentPost=new commentPost
		({
			commentID:data._id,
			postComment:req.body.postComment
		})
		newCommentPost.save(function(err,data)
		{
			console.log("comment save");
			res.status(200).json(data);
		})	
	})
}

userPost.SComment=function(req,res)
{
  CommentPost.findone({}).exec(function(err,data)
  {
  	res.status(200).json(data)
  })

}


userPost.CLike=function(req,res)
{
	CommentPost.findOneAndUpdate({commentID:req.body.id}),({$push:{commentLike:req.body.commentLike}}).exec(function(err,data)
	{
		console.log("comment liked")
		var l=data.commentLike.length;
		res.status(200).json("No of people that liked ur comment"+""+l);
	})
}	

    


     
     