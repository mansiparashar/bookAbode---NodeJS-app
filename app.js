var express			=require("express"),
	app				=express(),
	request			=require("request"),
	bodyParser		=require("body-parser"),
	mongoose 		=require("mongoose"),
	flash			=require("connect-flash"),
	passport		=require("passport"),
	LocalStrategy	=require("passport-local"),
	book 			=require("./models/book"),
	Comment			=require("./models/comment"),
	User			=require("./models/user"),
	seedDB			=require("./seed")
	
var commentRoutes 	=require("./routes/comments"),
	booksRoutes   	=require("./routes/books"),
	authRoutes    	=require("./routes/index")

app.use(flash());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});


//make a db dynamically
mongoose.connect("mongodb://localhost:27017/bookAbode", { useNewUrlParser: true,useUnifiedTopology: true});

//Passport config
app.use(require("express-session")({
	secret : "mansiyo",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(authRoutes);
app.use(booksRoutes);
app.use(commentRoutes);



app.listen(3000,function()
{
	console.log("App is running");
});
