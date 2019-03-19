const grid = document.querySelector('.grid');
const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modal_content = document.querySelector('.modal_content');

const url = 'https://randomuser.me/api/?results=12&nat=us&seed=srbweb'; // Get 12 random users

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

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

function loopEmployees(x) {
	let cell = createNode('div');
	cell.className ="cell";
	const html = `
			<div class="card">
				<div class="user" id="${x.id.value}">
					<div class="avatar">
						<img src='${x.picture.medium}' />
					</div>
					<div class='user-info'>
						<div class="name">${x.name.first} ${x.name.last}</div>
						<div class="email">
							${x.email}
						</div>
						<div class="city">
							${x.location.city}
						</div>
						<div class="reveal-on-modal">
							<div class="phone">
								${x.cell}
							</div>
							<div class="address">
								${x.location.street}
								${x.location.city}, ${x.location.state} ${x.location.postcode}
							</div>
							<div class="birthdate">
								${x.dob.date}
							</div>
						</div>
					</div>
				</div>

		</div>`;

	 cell.innerHTML = html;
	 append(grid, cell);

	 cell.addEventListener('click', (e) => {
		toggleModal();
		append(modal_content, cell);
	 });
}



function getEmployees(data) {
	let employees = data.results;
    return employees.map(function(employee) {
		loopEmployees(employee);
	});
}

// function profileOverlay() {
// 	card.addEventListener('click', (e) => {
// 		overlay.classList.add('is-active');
// 	});
// }

fetch(url)
	.then(response => response.json())
	.then(getEmployees)
	.catch(function(error) {
	// If there is any error you will catch them here
	});
