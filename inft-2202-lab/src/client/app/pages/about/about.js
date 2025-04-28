/*
Name: Alyssa Bhagwandin
Filename: about.js
Course: INFT 2202
Created Date: April 09, 2024
Description: This is the about page for the website. 
*/

import template from './about.ejs';

import '../../../img/profilePic.jpg';

export default (route) => {
    console.log("the about page", route);

    const html = template();
    document.getElementById('app').innerHTML = html;
        // .insertAdjacentHTML('afterbegin', html);
}