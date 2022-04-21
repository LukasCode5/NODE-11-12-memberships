const BASE_URL = 'http://127.0.0.1:3000/apii';

async function getServices(ulrEnd) {
  try {
    const response = await fetch(`${BASE_URL}/${ulrEnd}`);
    // fetch nepermeta kodo i catch bloka jei status yra klaidos
    if (response.ok === false) throw new Error('Something is wrong');
    const servcicesArr = await response.json();
    console.log('atsInJs ===', servcicesArr);
    console.log('piesiam korteles');
  } catch (error) {
    console.warn('error ===', error);
    console.log('atvaizduojam klaida');
  }
}

getServices('services');
