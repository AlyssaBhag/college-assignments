import template from './footer.ejs';

export default() => {
    const html = template();

    document.getElementById('app')
        .insertAdjacentElement('afterend', html)
}