// Import statments/.
import Navigo from 'navigo';

import HomePage from '../client/app/components/pages/home/home.js';
import AboutPage from '../client/app/components/pages/home/home.js';
// imports out page components.
import HeaderComponent from "./app/components/header/header.js";
import FooterComponent from './app/components/footer/footer.js';

import 'bootstrap';
//import the styles.
import './scss/styles.scss';

// Initialize router
const router = new Navigo('/');
// console.log("Hello World!");


window.addEventListener('load', () =>{

	HeaderComponent();
	
	router
	.on('/', HomePage )
	.on('/about', AboutPage)
	.on('/animals', (route) => 
		{ 
			console.log('animal search page', route); 
		})

	router.resolve();

	FooterComponent();
})