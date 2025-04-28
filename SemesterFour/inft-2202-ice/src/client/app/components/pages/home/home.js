import template from './home.ejs';  

import '../../../../img/about.png';
import '../../../../img/bag.jpg';
import '../../../../img/camal.png';
import '../../../../img/bag.jpg';
import '../../../../img/camal.png';
import '../../../../img/folder.png';
import '../../../../img/info.jpg';
import '../../../../img/jaguar.jpg';
import '../../../../img/panda.jpg';
import '../../../../img/panter.png';
import '../../../../img/plus.png';
import '../../../../img/turtle.png';

export default (router) => {
  console.log('index', router);

  render();
};

function render() {
  const html = template({
    random_stuff: 'This is custom data.'
  });

  document.getElementById('app').innerHTML = html;
}
