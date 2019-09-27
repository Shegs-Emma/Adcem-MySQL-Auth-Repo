const express 			= require("express"),
	  app				= express(),
	  mysql				= require("mysql"),
	  bodyParser		= require("body-parser"),
	  flash				= require("connect-flash"),
	  mongoose			= require("mongoose"),
	  passport			= require("passport"),
	  LocalStrategy		= require("passport-local"),
	  User				= require("./models/users");
	  
const customerRoutes	= require("./routes/customers"),
	  machineRoutes		= require("./routes/machines"),
	  reportRoutes		= require("./routes/reports"),
	  searchRoutes		= require("./routes/search"),
	  indexRoutes		= require("./routes/index");
//=================================================================================
//The MySQL Database Setup
//=================================================================================
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: process.env.MYSQL_PW,
	database: 'adcemdb'
});

//=================================================================================
//The Mongoose Database Setup
//=================================================================================
mongoose.connect('mongodb://localhost:27017/adcem_users', { useNewUrlParser: true });
//=================================================================================
//PASSPORT configurations
//=================================================================================
app.use(require("express-session")({
	secret: "Adcem offical DBMS",
	resave: false,
	saveUninitialized: false
}));

app.use(flash());//Always declare the function before you use it sir..
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//=================================================================================

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

//=================================================================================
app.use(indexRoutes);
app.use(customerRoutes);
app.use(reportRoutes);
app.use(machineRoutes);
app.use(searchRoutes);




//==================================================================================
//THE LISTENER
//==================================================================================
app.listen(3000, ()=>{
	console.log("Adcem db running..");
});