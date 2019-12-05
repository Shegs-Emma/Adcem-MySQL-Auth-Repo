const express					= require("express"),
	  router					= express.Router(),
	  auth          			= require('../middleware/auth'),
	  mysql						= require("mysql");



const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: process.env.MYSQL_PW,
	database: 'adcemdb'
});



//SEARCH ROUTE
router.get("/search", auth, (req, res) => {
	res.render("search/search");
});


router.get("/search_results", auth, (req, res) => {
	
	const { search } = req.query;
	const s = `SELECT * FROM customers WHERE hospital_name LIKE '%${search}%'`;
	
	connection.query(s, (err, results) => {
		if(err) throw err;
		
		const hospitals = results;
		
		if(hospitals && hospitals.length <= 0){
			req.flash("error", "That hospital does not exist in the database.");
			res.redirect("/search");
		} else {
			res.render("search/search_results_pages", {hospitals: hospitals});
		}
		
		// console.log({hospitals: hospitals});
	});
});

router.get("/search_results_mac", auth, (req, res) => {
	const { hosp_name } = req.query;

	const m = `SELECT 
		machines.device_type,
		machines.serial_no
	FROM customers
	INNER JOIN machines
	ON customers.id = machines.customer_id
	WHERE hospital_name = '${hosp_name.trim()}'`;
	
	connection.query(m, (err, results) => {
		if(err) throw err;
		
		const machines = results;
		// console.log(mac);
		if(machines && machines.length <= 0){
			req.flash("error", "That hospital does not have any machines installed.");
			res.redirect("back");
		} else {
			res.render("search/machine_search_result_pages", {machines: machines, hospital: hosp_name});
		}
		
		// console.log({hospitals: hospitals});
	});
});


router.get("/search_results_rep", auth, (req, res) => {
	
	const { mac_name } = req.query;

	const r = `SELECT 
		serial_no,
		ec,
		operating_hours,
		description,
		engineer_name,
		installation_date,
		extra_notes
	FROM machines
	INNER JOIN reports
	ON machines.serial_no = reports.machine_id
	WHERE machines.serial_no = '${mac_name.trim()}'`;
	
	connection.query(r, (err, results) => {
		if(err) throw err;
		
		const reports = results;
		
		if(reports && reports.length <= 0){
			req.flash("error", "This machine has no reports.");
			res.redirect("back");
		} else {
			res.render("search/report_search_result_pages", {reports: reports, machine: mac_name});
		}
	});
});



module.exports = router;