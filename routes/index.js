const express					= require("express"),
	  router					= express.Router(),
	  User						= require("../models/users"),
	  passport					= require("passport");
//=================================================================================
//These routes goes to the landing and home pages
//=================================================================================
router.get("/", (req, res) =>{
	res.render("landing");
});

router.get("/show", (req, res) => {
	res.render("home");
});


//==========================================================================================
//AUTHENTICATION ROUTES
//==========================================================================================

//REGISTER ROUTE
router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", (req, res) => {
	const newUser = new User({
		firstName: req.body.fname,
		lastName: req.body.lname,
		username: req.body.username,
		email: req.body.email,
	});
	if(req.body.adminCode === "info_techEmma"){
		newUser.isAdmin = true;
	}
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, ()=>{
			req.flash("success", `Welcome ${user.username}`);
			res.redirect("/show");
		});
	});
});


//LOGIN ROUTE
router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/show",
	failureRedirect: "/login"
}),(req, res) => {});



//LOGOUT ROUTE
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged you out..");
	res.redirect("/show");
});



module.exports = router;