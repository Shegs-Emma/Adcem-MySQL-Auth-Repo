/*I selected all the classes with that name, since they will all be of that name as they are being created. Its made a nodelist.*/
const searchLinksName = document.querySelectorAll('.hosp_name');

const machineDevType = document.querySelectorAll('.serialN');


/*for loop was terrible. The forEach loop was fantastic in doing the job.*/

/*=================================GIVE THE FORM AN ID AND GIVE IT A STYLE DISPLAY OF NONE==============================*/

searchLinksName.forEach(function(id){
	
	id.addEventListener('click', ()=>{
		
		/*I plan to use a form to carry the above content to the route i will create */
		/*I selected the body tag so i can connect my form to it*/
		const body = document.querySelector('#search-helper');
		
		/*I created my form dynamically here*/
		let newForm = document.createElement('form');
		newForm.setAttribute('method','get');
		newForm.setAttribute('action','/search_results_mac');
		newForm.id = "form-id";
		
		let inputHos = document.createElement('input');
		inputHos.type = "text";
		inputHos.name = "hosp_name";
		inputHos.id = "hosp_name1";
		inputHos.value = id.textContent;
		
		let inputSub = document.createElement("input");
		inputSub.type = "submit";
		inputSub.value = "Submit";
		
		newForm.appendChild(inputHos);
		newForm.appendChild(inputSub);
		
		body.appendChild(newForm);
	
		/*Submitted the form here*/
		newForm.submit();
	});
});


/*====================================THIS WILL LISTEN FOR THE MACHINES====================================================*/

machineDevType.forEach(function(mac){
	
	mac.addEventListener('click', ()=>{
		
		/*I plan to use a form to carry the above content to the route i will create */
		/*I selected the body tag so i can connect my form to it*/
		const body = document.querySelector('#search-helper');
		
		/*I created my form dynamically here*/
		let newForm2 = document.createElement('form');
		newForm2.setAttribute('method','get');
		newForm2.setAttribute('action','/search_results_rep');
		newForm2.id = "form-id2";
		
		let inputHos2 = document.createElement('input');
		inputHos2.type = "text";
		inputHos2.name = "mac_name";
		inputHos2.id = "mac_name1";
		inputHos2.value = mac.textContent;
		
		let inputSub2 = document.createElement("input");
		inputSub2.type = "submit";
		inputSub2.value = "Submit";
		
		newForm2.appendChild(inputHos2);
		newForm2.appendChild(inputSub2);
		
		body.appendChild(newForm2);
	
		/*Submitted the form here*/
		newForm2.submit();
	});
});

// ========================================TESTING FOR THE GENERALS==================================================
// const clicka = document.querySelector('.calcu');

// clicka.addEventListener('click', ()=>{
// 	const container = document.querySelector('#table-data');
// 	const col1 = container.querySelectorAll('td.4008B');
// });
// var genInfo = document.querySelector('#horf');

// document.addEventListener("DOMContentLoaded", function(){
//     const col1 = document.querySelectorAll('.4008B');
// });

// function getCols(){
// 	return new Promise ((resolve, reject)=>{
// 		setTimeout(()=>{
// 			document.querySelectorAll('.4008B');
// 		}, 3000);
// 	});
// };

// window.addEventListener('DOMContentLoaded', (event) => {
// 	async function pickCol(){
// 		const col1 = getCols();
// 	}
//     pickCol();
// });

// function getCols(){
// 	return new Promise((resolve, reject)=>{
// 		setTimeout(()=>{
// 			document.addEventListener('DOMContentLoaded', (event)=>{
// 				console.log('working');
// 			});
// 		}, 1000);
// 	})
// }

// async function start(){
// 	const start1 = getCols();
// 	const col1 = await start1;
// 	col1 = document.querySelectorAll(".4008B");
	
// 	col1.forEach(function(col1a){
// 		col1a.addEventListener('click', ()=>{
// 			alert(col1a.textContent);
// 		})
// 	})
// }

// document.addEventListener('DOMContentLoaded', (event)=>{
// 	start();
// });


// document.addEventListener('DOMContentLoaded', (event) => {
	
// 	setTimeout(()=>{
// 		document.querySelectorAll(".4008B");	
// 	}, 5000);
	
// });



// col1.forEach(function(colA){
// 	colA.addEventListener('click', ()=>{
// 		alert(colA.textContent);
// 	})
// });

// const total1 = document.querySelector('.4008BTot');


	
// 	let sum = 0;
	
// 	window.addEventListener('load', ()=>{
// 		alert('working');
// 		// sum += col.textContent;
// 		// total1.textContent = sum;
// 	})
// })


// document.addEventListener("DOMContentLoaded", function() {
//   console.log(genInfo.innerHTML);
// });

