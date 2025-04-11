/*
Name: Alyssa Bhagwandin
Filename: home.js
Course: INFT 2202
Created Date: April 09, 2024
Description: This is the home page of the website.
*/

import template from './home.ejs';

import '../../../img/tumblr_nn28dplsWU1u6jjy9o1_1280.gif'
import '../../../img/sonicchill.gif'
import '../../../img/mario-bros.gif'
import '../../../img/mortalK.gif'

import '../../../img/bag.jpg'
import '../../../img/info.jpg'
import '../../../img/cart.png'
import '../../../img/game.png'
import '../../../img/tombRaider.png'

export default (router) => {
    console.log('index', router);
  
    render();
  };
  
  function render() {
    const html = template({
      random_stuff: 'This is custom data.'
    });
  
    document.getElementById('app').innerHTML = html;
  }