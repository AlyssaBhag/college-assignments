import Navigo from 'navigo';

import HomePage from '../client/app/components/pages/home/home.js';
import AboutPage from './app/components/pages/about/about.js';
import SearchPage from './app/components/pages/search/search.js';
import CreatePage from './app/components/pages/create/create.js'; 
import ContactPage from './app/components/pages/contact/contact.js';

import HeaderComponent from './app/components/header/header.js';
import FooterComponent from './app/components/footer/footer.js';

import 'bootstrap';
import './scss/styles.scss';

// Initialize router
const route = new Navigo('/');

window.addEventListener('load', () => {
    try {
        // Run the header component
        HeaderComponent();

        // Run the footer component
        FooterComponent();

        // Configure routes
        route
            .on('/', HomePage)
            .on('/about', AboutPage)
            .on('/search', SearchPage)
            .on('/create', CreatePage) 
            .on('/contact', ContactPage);

        route.resolve();
    } catch (error) {
        console.error('Error initializing components:', error);
    }
});