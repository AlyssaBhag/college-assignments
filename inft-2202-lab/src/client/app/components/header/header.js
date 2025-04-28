/*
Name: Alyssa Bhagwandin
Filename: header.js
Course: INFT 2202
Created Date: April 09, 2024
Description: This is my header component. 
*/

import template from './header.ejs';

export default async () => {
    const html = template();
    document.querySelector('header').innerHTML = html;
};