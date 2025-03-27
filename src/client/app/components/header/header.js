import template from './header.ejs';

export default() => {
    const html = template();

    document.getElementById('app')
        .insertAdjacentElement('beforebegin', html)
}