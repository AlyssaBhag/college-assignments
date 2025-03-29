import template from './header.ejs';

export default (router) => {
    const route = router.current;  // You can access current route from Navigo



    
    const html = template();
    console.log("This is the header, current route:", route);

    document.getElementById('app')
        .insertAdjacentElement('beforebegin', html);
}
