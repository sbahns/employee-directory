const grid = document.querySelector('.grid');
const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modal_content = document.querySelector('.modal_content');

const json = 'https://randomuser.me/api/?results=12&nat=us&seed=srbweb'; // Get 12 random users

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
  .then(getEmployees);

fetchData(json)
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
	return `
				<button title="Close" class="close_modal">
					X
				</button>

				<div>
				    <span class="prev"> < </span>
				    <span class="next"> > </span>
				</div>
				<div class="card" data-id="${array[index]}">
					<div class="user">
						<div class="avatar">
							<img src='${array[index].picture.medium}' />
						</div>
						<div class='user-info'>
							<div class="name">${array[index].name.first} ${array[index].name.last}</div>
							<div class="email">
								${array[index].email}
							</div>
							<div class="city">
								${array[index].location.city}
							</div>
							<div class="reveal-on-modal">
								<div class="phone">
									${array[index].cell}
								</div>
								<div class="address">
									${array[index].location.street}
									${array[index].location.city}, ${array[index].location.state} ${array[index].location.postcode}
								</div>
								<div class="birthdate">
									${array[index].dob.date}
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
							<div class="name">${employee.name.first} ${employee.name.last}</div>
							<div class="email">
								${employee.email}
							</div>
							<div class="city">
								${employee.location.city}
							</div>
						</div>
					</div>

			</div>`;

		 cell.innerHTML = html;
		 append(grid, cell);
	});
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
