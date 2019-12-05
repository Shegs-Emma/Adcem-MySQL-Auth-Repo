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
router.get("/all", auth, (req, res) => {
	const g = 'SELECT c.id, hospital_name, c.region, m.device_type,	COUNT(device_type) AS count FROM customers c INNER JOIN machines m ON c.id = m.customer_id GROUP BY hospital_name, device_type ORDER BY c.id;';
	
	connection.query(g, (err, results) => {
		if(err) throw err;
		const allInfos = results;
		
		let newInfos = new Map();
		
		if(allInfos){
			for(var i=0; i<allInfos.length; i++) {
				let newObj = {};
				for(var j=1; j<allInfos.length -1; j++) {
					if(allInfos[i].hospital_name === allInfos[j].hospital_name) {
						newObj.id = allInfos[i].id;
						newObj.hospital_name = allInfos[i].hospital_name;
						newObj.region = allInfos[i].region;
						newObj.device_type = allInfos[i].device_type !== allInfos[j].device_type ? 
							[{[allInfos[i].device_type]:allInfos[i].count}].concat(...[{[allInfos[j].device_type]: allInfos[j].count}]) : {[allInfos[i].device_type]: allInfos[i].count};
						
					}
				}
				
				newInfos.set(newObj.id, newObj);
			}
		}
		
		
		let newArr = Array.from([...newInfos]);
		
		newArr = newArr.reduce((acc, curr, idx) => {
			acc[idx] = curr[1];
			return acc;
		}, [])
		
		//res.status(200).json(newArr);
		res.render("tables/genInfo", {newArr: newArr});
	});
});


module.exports = router;