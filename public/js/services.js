const BASE_URL = 'http://127.0.0.1:3000/api';
const cardContainerEl = document.querySelector('.service-cards-container');

async function getServices(ulrEnd) {
  try {
    const response = await fetch(`${BASE_URL}/${ulrEnd}`);
    // fetch nepermeta kodo i catch bloka jei status yra klaidos
    if (response.ok === false) throw new Error('Something is wrong');
    const servcicesArr = await response.json();
    console.log('atsInJs ===', servcicesArr);
    console.log('piesiam korteles');
    generateCards(servcicesArr);
  } catch (error) {
    console.warn('error ===', error);
    console.log('atvaizduojam klaida');
  }
}

getServices('services');

function generateCards(cardArr) {
  cardArr.forEach((cardObj) => {
    const cardConEl = document.createElement('div');
    cardConEl.className = 'service-card';

    const cardTitleEl = document.createElement('h3');
    cardTitleEl.className = 'card-title';
    cardTitleEl.textContent = `$${cardObj.price} ${cardObj.name}`;

    const cardDescriptionEl = document.createElement('p');
    cardDescriptionEl.className = 'card-description';
    cardDescriptionEl.textContent = cardObj.description;

    const cardDelBtnCon = document.createElement('div');
    cardDelBtnCon.className = 'card-del-container';

    const cardDelBtn = document.createElement('button');
    cardDelBtn.className = 'card-del-button';
    cardDelBtn.textContent = 'need to add trash can icon';
    cardDelBtn.addEventListener('click', async (req, res) => {
      const response = await fetch(`${BASE_URL}/services/${cardObj._id}`, {
        method: 'DELETE',
      });
    });
    cardDelBtnCon.append(cardDelBtn);
    cardConEl.append(cardTitleEl, cardDescriptionEl, cardDelBtnCon);
    cardContainerEl.append(cardConEl);
  });
}
