// Import statments/.
import Navigo from 'navigo';

// imports out page components.
import HeaderComponent from "./app/components/header/header.js";
import FooterComponent from './app/components/footer/footer.js';

import HomePage from '../client/app/components/pages/home/home.js';
// ! Uncomment this when you add all of the pages all correctly.
// import AboutPage from './app/components/home/home.js';
// import CreatePage from './app/components/home/home.js';
// import SearchPage from './app/components/home/home.js';

//import the styles.
import './scss/styles.scss';

// Initialize router
const router = new Navigo('/');

// console.log("Hello World!");


window.addEventListener('load', () =>{

        
    HeaderComponent();
    FooterComponent();

    // Main pages.
    router.on("/", (router) => {
        HomePage(router);
        console.log("The Index / Home page!", router);
    });

    router.on("/search", (router) => {
        console.log("The Search page!", router);
    });

    router.on("/create", (router) => {
        console.log("The Create page!", router);
    });

    // Other supplementary pages.
    router.on("/about", (router) => {
        console.log("The About page!", router);
    });

    router.on("/contact", (router) => {
        console.log("The Contact page!", router);
    });

    // router.on("/privacy-policy", (router) => {
    //     console.log("The About page!");
    // });

    // router.on("/terms", (router) => {
    //     console.log("The About page!");
    // });

    router.resolve();

})

