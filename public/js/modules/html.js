function makeEl(tagName, text, destination, elClass = null) {
  const element = document.createElement(tagName);
  element.textContent = text;
  if (elClass) element.className = elClass;
  destination.append(element);
  return element;
}

/*  <article class="card">
      <h3>Price Title</h3>
     <p>Description</p>
     <div class="hr"></div>
    <button class="btn btn-delete">delete</button>
     </article>
          */
// eslint-disable-next-line import/prefer-default-export
export function createCard(newCardObj) {
  const articleEl = document.createElement('article');
  articleEl.className = 'card';
  makeEl('h3', `${newCardObj.price} eur ${newCardObj.name}`, articleEl);
  makeEl('p', newCardObj.description, articleEl);
  makeEl('div', '', articleEl, 'hr');
  // makeEl('button', 'Delete', articleEl, 'btn btn-delete');
  const btn = makeEl('button', 'Delete', articleEl, 'btn btn-delete');
  makeEl('i', '', btn, 'fa fa-trash');
  //   console.log('articleEl ===', articleEl);

  return articleEl;
}

export function renderCards(cardArr, destination) {
  // isvalyti destination kad neliktu pries tai buvusiu korteliu
  destination.innerHTML = '';
  // sukti cikla ir irasyti visas gautas korteles
  cardArr.forEach((cardObj) => {
    const card = createCard(cardObj);
    destination.append(card);
  });
}
