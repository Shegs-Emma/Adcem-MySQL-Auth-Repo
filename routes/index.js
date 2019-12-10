const express					= require("express"),
	  bcrypt					= require("bcrypt"),
	  jwt						= require("jsonwebtoken"),
	  mysql						= require("mysql"),
	  cookieParser				= require("cookie-parser"),
	  router					= express.Router();

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: process.env.MYSQL_PW,
	database: 'adcemdb'
});
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
	const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const uname = req.body.username;
	let isAdmin = false;
    const password = req.body.password;
	if(req.body.adminCode === "info_techEmma" || req.body.adminCode === "2792"){
		isAdmin = true;
	}
	

    bcrypt.hash(password, 10).then((hash)=>{
        const user = {
			firstName: fname,
			lastName: lname,
			userName: uname,
			email: email,
			password: hash,
			isAdmin: isAdmin
		};

		connection.query('INSERT INTO users SET ?', user, (err, result) => {
			if(err){
				req.flash("error", err.message);
				return res.render("register");
			}
			// req.flash("success", `Welcome ${req.body.username}`);
			res.redirect("/login")
		});
    }).catch((error)=>{
		console.log(error);
        res.status(500).json({
            error: error
        });
    });
});


//LOGIN ROUTE
router.get("/login", (req, res) => {
	res.render("login");
});


router.post("/login", (req, res) => {
	let message = '';
	let sess = req.session;
	
	if(req.method == 'POST'){
		let post = req.body;
		let name = post.username;
		let pass = post.password;
		
		const query = `SELECT * FROM users WHERE userName = '${name}'`;
		
		connection.query(query, (err, results) => {
			
			if(results.length){
				sess.userId = results[0].id;
				sess.user = results[0];
				
				bcrypt.compare(pass, sess.user.password).then(
					(valid)=>{
						if(!valid){
							return res.status(401).json({
								error: new Error('Incorrect password')
							});
						}
						const token = jwt.sign(
							{userId: sess.user.id},
							'RANDOM_TOKEN_SECRET',
							{expiresIn: '24h'}
						);
						
						res.cookie("auth", token, {expire: 4000 + Date.now()});
						res.cookie("userData", sess.user, {expire: 4000 + Date.now()});
						// res.status(200).json({
						// 	userId: sess.user.id,
						// 	token: token
						// });
						req.flash("success", `Welcome ${req.body.username}`);
						res.redirect("/show");
						
					}
				).catch((error)=>{
					console.log(error);
					res.status(500).json({
						error: "Here two"
					});
					res.redirect("/show");
				});
			}
		});
	}
});



//LOGOUT ROUTE
router.get("/logout", (req, res) => {
	let sess = req.session.user;
	if(sess){
		req.session.user = null;
		req.flash("success", "Logged you out..");
		res.clearCookie("auth");
		res.clearCookie("userData");
		res.redirect("/show");
	}
});



module.exports = router;