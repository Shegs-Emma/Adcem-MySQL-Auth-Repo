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
var genInfo = document.querySelector('#horf');

genInfo.addEventListener('click', ()=>{
	alert(genInfo.innerHTML);
});


// document.addEventListener("DOMContentLoaded", function() {
//   console.log(genInfo.innerHTML);
// });

