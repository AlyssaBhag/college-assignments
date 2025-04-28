/*
Name: Alyssa Bhagwandin
Filename: contact.js
Course: INFT 2202
Created Date: April 09, 2024
Description: This is the contact page for the website.
*/

import template from './contact.ejs';

export default (route) => {
  console.log("the contact page", route);

  const html = template();
  document.getElementById('app').innerHTML = html;
      // .insertAdjacentHTML('afterbegin', html);
}

