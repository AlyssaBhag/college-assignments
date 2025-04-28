/*
Name: Alyssa Bhagwandin
Filename: index.js
Course: INFT 2202
Created Date: April 09, 2024
Description: This is the about page of the website. 
*/

import Navigo from 'navigo';
import HomePage from './app/pages/home/home.js';
import AboutPage from './app/pages/about/about.js';
import ContactPage from './app/pages/contact/contact.js';
import ListProductsPage from './app/pages/list-products/list.js';
import CreateProductPage from './app/pages/create-products/create.js';
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
        .on('/contact', ContactPage)
        .on('/products', ListProductsPage)
        .on('/create', CreateProductPage)

        route.resolve();
    } catch (error) {
        console.error('Error initializing components:', error);
    }
});


