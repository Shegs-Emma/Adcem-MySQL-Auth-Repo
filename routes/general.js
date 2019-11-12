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
//This route goes to the Machine inclusion page
//==========================================================================================
router.get("/all",(req, res) => {
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
		
		// console.log(newArr);
		// console.log(newArr.device_type);
		// let idx = 1; // key2

		// let key = Object.keys(newArr.device_type)[idx];
		// value = newArr.device_type[key]

		// console.log(key,value);
		// console.log(Object.values(newArr.device_type));
		
		// res.send(newArr);

		
		// I created an array of all the different elements i need.
		// let allHospName = [];
		// let allRegion = [];
		// let allDeviceType = [];
		// let allCount = [];
		
		// I iterated through them all, so i can have access to individual element.
		// allInfos.forEach((allInfo) =>{
		// 	let allHosp = allInfo.hospital_name;
		// 	let allDevices = allInfo.device_type;
		// 	let allRegions = allInfo.region;
		// 	let count = 0;
			
		// 	allHospName.push(allHosp);
		// 	allRegion.push(allRegions);
		// 	allDeviceType.push(allDevices);
			
			
			// for(let i = 0; i < allHospName.length; i++){
			// 	let currentHosp = allHospName[i];
			// 	let nextHosp = allHospName[i + 1];
				
			// 	while(currentHosp === nextHosp){
			// 		count++;
			// 	}
				
			// 	allCount.push(count);
			// }
			
			// return (
			// 	allHospName,
			// 	allRegion,
			// 	allDeviceType
			// 	// allCount
			// );
			// res.render("tables/genInfo", {allInfos: allInfos});
		// });
		
		// I created an object maping each element to their pair.
		// res.status(200).json({
		// 	"hospitals" : allHospName, 
		// 	"regions" : allRegion, 
		// 	"devices" : allDeviceType
		// 	// "count" : allCount
		// });
		
		// res.status(200).json(allInfos);
		res.render("tables/genInfo", {newArr: newArr});
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