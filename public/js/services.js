import { renderCards } from './modules/html.js';

const BASE_URL = 'http://127.0.0.1:3000/api';

const cardsContainerEl = document.querySelector('.cards-container');

async function getServices(ulrEnd) {
  try {
    const response = await fetch(`${BASE_URL}/${ulrEnd}`);
    // fetch nepermeta kodo i catch bloka jei status yra klaidos
    if (response.ok === false) throw new Error('Something is wrong');
    const servcicesArr = await response.json();
    console.log('atsInJs ===', servcicesArr, cardsContainerEl);
    console.log('piesiam korteles');
    renderCards(servcicesArr, cardsContainerEl);
  } catch (error) {
    console.warn('error ===', error);
    console.log('atvaizduojam klaida');
  }
}

getServices('services');
