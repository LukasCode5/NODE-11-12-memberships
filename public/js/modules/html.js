import { deleteService } from '../services.js';
import { BASE_URL } from './config.js';

function makeEl(tagName, text, dest, elClass = null) {
  const el = document.createElement(tagName);
  el.textContent = text;
  if (elClass) el.className = elClass;
  dest.appendChild(el);
  return el;
}
/* <article class="card">
    <h3>Price Title</h3>
    <p>Desctip</p>
    <div class="hr"></div>
    <button class="btn btn-delete">delete</button>
  </article> */
// eslint-disable-next-line import/prefer-default-export
export function createCard(newCardObj) {
  const articleEl = document.createElement('article');
  articleEl.className = 'card';
  makeEl('h3', `${newCardObj.price} eur ${newCardObj.name}`, articleEl);
  makeEl('p', newCardObj.description, articleEl);
  makeEl('div', '', articleEl, 'hr');
  // makeEl('button', 'delete', articleEl, 'btn btn-delete');
  const btn = makeEl('button', '', articleEl, 'btn btn-delete');
  makeEl('i', '', btn, 'fa fa-trash');
  btn.onclick = async () => {
    const foundSer = await findService(newCardObj._id);
    // console.log('foundSer ===', foundSer);
    if (foundSer === true) {
      alert('This service is in use');
    } else {
      deleteService(newCardObj._id);
      // console.log('delete ', newCardObj._id);
    }
  };

  // console.log('articleEl ===', articleEl);
  return articleEl;
}

export function renderCards(cardArr, dest) {
  // isvalyti dest kad neliktu pries tai buvusiu korteliu
  dest.innerHTML = '';
  // sukti cikla ir irasyti visas gautas korteles
  cardArr.forEach((cObj) => {
    const card = createCard(cObj);
    dest.append(card);
  });
}

async function findService(targetServiceId) {
  const response = await fetch(`${BASE_URL}/services`);
  const ats = await response.json();
  const foundService = ats.find((sObj) => sObj._id === targetServiceId);
  // console.log('foundService ===', foundService);
  return foundService.userCount > 0 ? true : false;
}
