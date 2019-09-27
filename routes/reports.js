const express					= require("express"),
	  router					= express.Router(),
	  mysql						= require("mysql");


const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: process.env.MYSQL_PW,
	database: 'adcemdb'
});


//==========================================================================================
//This route goes to the Report inclusion page
//==========================================================================================
router.get("/add_rep", isLoggedIn, (req, res) => {
	const p = 'SELECT COUNT(*) AS count FROM reports';
	
	connection.query(p, (err, results) => {
		if(err) throw err;
		const count = results[0].count;
		
		let rep = (count <= 1) ? "report" : "reports" ;
		res.render("tables/reports", {count: count, rep: rep});
	});
});

router.post("/add_rep", isLoggedIn,(req, res) => {
	const report = {
		customer_id: req.body.cusid,
		machine_id: req.body.macid,
		service_report_no: req.body.srno,
		report_date: req.body.rdte,
		machine_hours: req.body.machr,
		engineer_name: req.body.egnr,
		request_status: req.body.rstat,
		description: req.body.desc,
		extra_notes: req.body.enote
	};
	
	connection.query('INSERT INTO reports SET ?', report, (err, result) => {
		if(err) throw err;
		req.flash("success", "Report successfully added to the database.");
		res.redirect("back")
	});
});




function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login first!");
	res.redirect("/login");
};
module.exports = router;