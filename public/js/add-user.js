import { BASE_URL } from './modules/config.js';

console.log('add user');

// pasigauti visus input el
// nusitaikyti i forma
const formEl = document.forms[0];
const selectEl = document.getElementById('service_id');

formEl.addEventListener('submit', (event) => {
  // sustabdyti forma nuo persiuntimo
  event.preventDefault();

  // sudeti visas reiksmes i objekta issiuntimui
  const newUserObj = {
    name: formEl.elements.name.value,
    surname: formEl.elements.surname.value,
    email: formEl.elements.email.value,
    service_id: formEl.elements.service_id.value,
  };
  // consoleje isitikinam kad veikia
  console.log('newUserObj ===', newUserObj);
  createUser(newUserObj);
});

async function createUser(userObj) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userObj),
  });
  console.log('response ===', response);
  if (response.status === 201) {
    // sukurta sekmingai
    //window.location.href = 'index.html';
  } else {
    console.log('something went wrong');
  }
}

// pasisiuti services

async function getServices() {
  const response = await fetch(`${BASE_URL}/services`);
  const serArr = await response.json();
  console.log('ats ===', serArr);
  renderOptions(serArr, 'service_id');
}

getServices();
// sugeneruoti options si createElement

// <option value"1">Trial</option>
function renderOptions(serArr, destinationId) {
  const selectEl = document.getElementById(destinationId);
  selectEl.innerHTML = '';
  serArr.forEach((serviceObj) => {
    const optionEl = document.createElement('option');
    optionEl.value = serviceObj._id;
    optionEl.textContent = serviceObj.name;
    selectEl.append(optionEl);
  });
}
