console.log('add service');

const BASE_URL = 'http://localhost:3000/api';

const descriptionEl = document.getElementById('description');
const formEl = document.forms[0];

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('js is in control');
  const newServiceObj = {
    name: formEl.elements.name.value,
    price: formEl.elements.price.value,
    description: formEl.elements.description.value,
  };
  console.log('newServiceObj ===', newServiceObj);
  createService(newServiceObj);
});

async function createService(serviceObj) {
  const response = await fetch(`${BASE_URL}/services`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(serviceObj),
  });
  console.log('response ===', response);
  if (response.status === 201) {
    // sukurta sekmingai
    window.location.href = 'index.html';
  } else {
    console.log('something went wrong');
  }
  //   const ats = await response.json();
  //   console.log('ats ===', ats);
}
