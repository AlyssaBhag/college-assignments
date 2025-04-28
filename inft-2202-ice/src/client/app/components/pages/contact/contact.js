import template from './contact.ejs';

import '../../../../img/about.png';
import '../../../../img/bag.jpg';

export default (route) => {
  console.log("the contact page", route);

  const html = template();
  document.getElementById('app').innerHTML = html;
      // .insertAdjacentHTML('afterbegin', html);
}

