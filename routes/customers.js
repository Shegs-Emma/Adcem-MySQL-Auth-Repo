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
//=================================================================================
//This route goes to the customer inclusion page
//=================================================================================
router.get("/add_cus", auth, (req, res, next) => {
	const c = 'SELECT COUNT(*) AS count FROM customers';
	
	connection.query(c, (err, results) => {
		// console.log(results);
		if(results.length){
			const count = results[0].count;
		
			let cus = (count <= 1) ? "customer" : "customers" ;
			res.render("tables/customers", {count: count, cus: cus});
		} else{
			console.log(err);
		}
		// if(err) throw err;
		
	});
});

router.post("/add_cus", auth, (req, res) => {
	const customer = {
		hospital_name: req.body.name,
		hospital_addr: req.body.addr,
		region: req.body.region,
		phone: req.body.phone
	};
	
	connection.query('INSERT INTO customers SET ?', customer, (err, result) => {
		if(err) throw err;
		req.flash("success", `${req.body.name} has been successfully added to the database.`);
		res.redirect("/show")
	});
});



module.exports = router;