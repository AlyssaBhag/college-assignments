import template from './footer.ejs';

export default() => {
    console.log("this is the foot", route);
    const html = template();

    document.getElementById('app')
        .insertAdjacentElement('afterend', html)
}