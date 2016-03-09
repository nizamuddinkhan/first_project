var mongoose=require('mongoose'),
    Schema = mongoose.Schema;

     //session schema
    var postSchema=Schema
        ({
        postID:{type:String,default:''},
        postBody:{type:String,default:''},
        postLike:{type:String,default:''}
        
        });

    var commentSchema=Schema
        ({
         commentID:{type:String,default:''},
         postComment:{type:String,default:''},
         commentLike:{type:String,default:[]}	
        
        });

     //session model
     mongoose.model("commentPost",commentSchema);
     mongoose.model("UserPost",postSchema);   
