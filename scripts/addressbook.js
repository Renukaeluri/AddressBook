window.onload = function()     //Buttons
{
	var quickAddBtn = document.getElementById("QuickAdd");
	var AddBtn = document.getElementById("Add");
	var cancelBtn = document.getElementById("Cancel");
	var quickAddFormDiv = document.querySelector('.quickaddform');  //bcz this is a class name

	//form fields

	var fullname = document.getElementById("fullname");
	var phone = document.getElementById("phone");
	var address = document.getElementById("address");
	var city = document.getElementById("city");
	var email = document.getElementById("email");

	//AddressBook display

	var addBookDiv = document.querySelector(".addbook");

	// create and array and which hold Json entries of all address book like storage array

		var addressBook = [];

	//Event listeners
	quickAddBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	})

	//when you click ADD Now details should be displayed 

	AddBtn.addEventListener("click", addToBook);
		//event listener  to make the delete button function 
		//bubling	
		addBookDiv.addEventListener("click", removeEntry);


		// constructor function

		function jsonStructe(fullname, phone, address, city, email){
			this.fullname = fullname;
			this.phone = phone;
			this.address = address;
			this. city = city;
			this.email = email;
		}



	function addToBook(){				// only if all the fields are filled then only you can submit the form 
		var isNull = fullname.value!='' && phone.value!='' && address.value!='' && city.value!='' && email.value!='';
		//console.log(isNull);

		if(isNull){
						//add the contents of form to array and local storage
			// var obj = {"fullname":"Renuka Eluri", "phone":"978-376-8144", "address": "mountain view", "city": "mountain view", "email":"Eluri.Renuka@gmail.com"}; //json obj
				var obj = new jsonStructe(fullname.value, phone.value, address.value, city.value, email.value);
				addressBook.push(obj);
				localStorage['addbook'] = JSON.stringify(addressBook); //local storage can only store strings but here is array so convery array to valid string


				quickAddFormDiv.style.display = "none"; //hide the form

				clearForm();  		//clear the form 
				showAddressBook();
		}
	}	

			function removeEntry(e){   //when person click anweyer inside addbookdiv , passes via E					//remove entries from addressbook
			if(e.target.classList.contains("delbutton")){
				var remID = e.target.getAttribute("data-id");		//indexid
					addressBook.splice(remID, 1);		//remove JSON etry from array with index num = remID
					localStorage['addbook'] = JSON.stringify(addressBook);
					showAddressBook();											
			}
		}

			function clearForm(){  					//clear the form , update and display new 
				var frm = document.querySelectorAll(".formFields");
				for(var i in frm){
					frm[i].value = '';
		}
	}

		function showAddressBook(){
														//check if the key 'addbook' exists in localstorage or else create it. if it exists, load contents from localstorgae and loop , display it on page
		if(localStorage['addbook'] === undefined){
		localStorage['addbook'] = "[]";
	} 	else {						//if storage contains something then update empty array with content
				addressBook = JSON.parse(localStorage['addbook']);
				addBookDiv.innerHTML = '';											//empty addbook div
				for (var n in addressBook){
					var str =  '<div class="entry">';
					str += '<div class="name"><p>'   + addressBook[n].fullname + '</p></div>';				
					str += '<div class="email"><p>'  + addressBook[n].email    + '</p></div>';
					str += '<div class="phone"><p>'  + addressBook[n].phone    + '</p></div>';
					str += '<div class="address"><p>'+ addressBook[n].address  + '</p></div>';
					str += '<div class="city"><p>' 	 + addressBook[n].city 	   + '</p></div>';	
					str += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
					str += '</div>';
					addBookDiv.innerHTML += str;

				}
		}
	}
		showAddressBook();

}



















