import template from './footer.ejs';

export default () => {
    const html = template();
    const appElement = document.getElementById('app');
    if (appElement) {
        appElement.insertAdjacentHTML('afterend', html);
    } else {
        console.error("App element not found!");
    }
};