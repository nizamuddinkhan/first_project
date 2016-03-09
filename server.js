var app = require("express")(),
mongoose=require("mongoose"),
bodyParser=require("body-parser"),
session=require('express-session'),
cookieParser=require('cookie-parser'),
expressValidator = require('express-validator'),
//file stream
fs = require("fs");
  
  

const MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost/test25');


app.use(cookieParser());

app.use(session({secret:'anystring',
                 store: new MongoStore({mongooseConnection: mongoose.connection}),
                 saveUnintialized: true,
                 resave: true

                }));


//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//parse application/json
app.use(bodyParser.json())

app.use(expressValidator());
  

//readdring hmtl file
app.get("/angular.html",function(req,res)
{
    res.sendFile(__dirname+("/angular.html"));
})



fs.readdirSync(__dirname+"/models").forEach(function(filename){
	 console.log(filename)
     if (filename.indexOf('.js'))
	require(__dirname+"/models/"+filename);
});

fs.readdirSync(__dirname+"/controllers").forEach(function(filename){
	console.log(filename);
     if (filename.indexOf('.js'))
     	require(__dirname+"/controllers/"+filename)(app);
});



app.listen(3000, function(req,res) {
console.log("App running on" ,3000);
})


