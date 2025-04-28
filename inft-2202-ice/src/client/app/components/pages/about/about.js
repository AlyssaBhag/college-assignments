import template from './about.ejs';

import '../../../../img/poke_Ball_icon.png';

export default (route) => {
    console.log("the about page", route);

    const html = template();
    document.getElementById('app').innerHTML = html;
        // .insertAdjacentHTML('afterbegin', html);
}