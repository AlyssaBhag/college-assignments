/*
Name: Alyssa Bhagwandin
Filename: footer.js
Course: INFT 2202
Created Date: April 09, 2024
Description: This is my footer component.
*/

import template from './footer.ejs';

export default async () => {
    const html = template();
    document.querySelector('footer').innerHTML = html;
};