import template from './header.ejs';

export default () => {
    const html = template();
    const appElement = document.getElementById('app');
    if (appElement) {
        appElement.insertAdjacentHTML('beforebegin', html);
    } else {
        console.error("App element not found!");
    }
};