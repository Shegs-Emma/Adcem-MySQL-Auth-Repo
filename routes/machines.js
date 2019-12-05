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
//==========================================================================================
//This route goes to the Machine inclusion page
//==========================================================================================
router.get("/add_mac", auth,(req, res) => {
	const m = 'SELECT COUNT(*) AS count FROM machines';
	
	connection.query(m, (err, results) => {
		if(err) throw err;
		const count = results[0].count;
		
		let mac = (count <= 1) ? "machine" : "machines" ;
		res.render("tables/machines", {count: count, mac: mac});
	});
});

router.post("/add_mac", auth,(req, res) => {
	const machine = {
		serial_no: req.body.slno,
		device_type: req.body.dtype,
		ec: req.body.ec,
		installation_date: req.body.inst_date,
		warranty_end: req.body.warr_date,
		ppm_date: req.body.ppm,
		operating_hours: req.body.op_hrs,
		machine_status: req.body.mac_stat,
		customer_id: req.body.cus_id
	};
	
	connection.query('INSERT INTO machines SET ?', machine, (err, result) => {
		if(err) throw err;
		req.flash("success", `${req.body.dtype} with serial number ${req.body.slno} has been successfully added to the database.`);
		res.redirect("back")
	});
});



module.exports = router;