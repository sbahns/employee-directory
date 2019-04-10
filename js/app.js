const grid = document.querySelector('.grid');
const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modal_content = document.querySelector('.modal_content');

// function formatDate(setTime) {
// 	var str = setTime;
// 	var res = str.slice(0, 9);
// }

const json = 'https://randomuser.me/api/?results=12&nat=us'; // Get 12 random users

let employee = [];
let selectedProfile = 0;

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
           .then(res => res.json())
}

fetchData(json)
  .then(getEmployees)
  .then(function(data) {
		employee = data.results;
	      let cell = document.querySelectorAll('.cell');
	        for (let i=0; i<cell.length; i++) {
	        cell[i].addEventListener('click', () => {
	          if (modal.className=='modal') {
	              selectedProfile = i;
	              document.querySelector('.modal_content').innerHTML = employeeModal(employee, i);
  	  		  }
			  toggleModal();
	       });
	    }
	});

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------


function employeeModal(array, index) {

	console.log(array[index].dob.date);

	let birthdate = array[index].dob.date;

	let str = birthdate;
	let res = str.substring(5, 7)+ '/' +str.substring(8, 10)+ '/' + str.substring(0, 4);

	return `
		<button title="Close" class="close_modal">
			X
		</button>
		<div class="card" data-id="${index}">
			<div class="user">
				<div class="avatar">
					<img src='${array[index].picture.medium}' />
				</div>
				<div class='user-info'>
					<div class="name">
						<h2>${array[index].name.first} ${array[index].name.last}</h2>
					</div>
					<div class="email">
						<p>${array[index].email}</p>
					</div>
					<div class="city">
						<p>${array[index].location.city}</p>
					</div>

					<div class="reveal-on-modal">
						<div class="phone">
							<p>${array[index].cell}</p>
						</div>
						<div class="address">
							<p>${array[index].location.street}, ${array[index].location.city}, ${array[index].location.state} ${array[index].location.postcode}</p>
						</div>
						<div class="birthdate">
							<p>Birthday: ${res}</p>
						</div>
					</div>
				</div>
			</div>
		</div>`;
}


function getEmployees(data) {
	let employees = data.results;
	employees.forEach((employee, index) => {
		let cell = createNode('div');
		cell.className ="cell";
		const html = `
				<div class="card" data-id="${index}">
					<div class="user">
						<div class="avatar">
							<img src='${employee.picture.medium}' />
						</div>
						<div class='user-info'>
							<div class="name">
							 <h2>${employee.name.first} ${employee.name.last}</h2>
							</div>
							<div class="email">
								<p>${employee.email}</p>
							</div>
							<div class="city">
								<p>${employee.location.city}</p>
							</div>
						</div>
					</div>

			</div>`;

		 cell.innerHTML = html;
		 append(grid, cell);
	});
	return data;
}





// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
function attachModalListeners(modalElm) {
  modalElm.querySelector('.close_modal').addEventListener('click', toggleModal);
  modalElm.querySelector('.overlay').addEventListener('click', toggleModal);
}

function detachModalListeners(modalElm) {
  modalElm.querySelector('.close_modal').removeEventListener('click', toggleModal);
  modalElm.querySelector('.overlay').removeEventListener('click', toggleModal);
}

function toggleModal() {
  var currentState = modal.style.display;
  // If modal is visible, hide it. Else, display it.
  if (currentState === 'none') {
    modal.style.display = 'block';
    attachModalListeners(modal);
  } else {
    modal.style.display = 'none';
    detachModalListeners(modal);
  }
}
