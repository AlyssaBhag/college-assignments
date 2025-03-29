import template from './about.ejs';

export default (route) => {
    console.log("the about page", route);

    const html = template();
    document.getElementById('app').innerHTML = html;
        // .insertAdjacentHTML('afterbegin', html);
}