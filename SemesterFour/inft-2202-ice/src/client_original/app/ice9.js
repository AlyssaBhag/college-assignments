/*
Name: Alyssa Bhagwandin
Filename: ice9.js
Course: INFT 2202
Created Date: February 5th, 2025
Description: This is the ice9.js file which will fetching from the animals.json file for data.
*/

console.log('We are on the ice9 page');

// * Imported animals from the animals.js for the string.
import Animal from "./animals/animal.js";

// This stuff are all of the old stuff from my search.js file that I need to copy over to display the table.
const eleTable = document.getElementById('animals-list');
const eleTbody = document.querySelector('tbody');
const eleMessageBox = document.getElementById('message-box');
// const eleSpinIcon = document.getElementById('spinner-icon');
const elePaginationContainer = document.getElementById('pagination-container');

const url = new URL(window.location);
const search = url.searchParams;
// * I did this part a little different.
const page = Math.max(1, parseInt(search.get('page')) || 1); // Ensure page is at least 1
const perPage = 25; // Show only 5 per page to avoid overwhelming users
console.log(`Page: ${page}, Per Page: ${perPage}`);


// Added this so it calls it as soon as the page loads.
const data = await fetchAnimalAsync();
drawAnimalTable(data);
renderAsyncPage();

// Function to make the page wait.
// function waitTho(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// toggles the table so you can see it.
function toggleTableVisibility(animals) {
  if (animals.length === 0) {
    eleMessageBox.innerHTML = "No animals found.";
    eleMessageBox.classList.remove('d-none');
    eleTable.classList.add('d-none');
  } else {
    eleMessageBox.classList.add('d-none');
    eleTable.classList.remove('d-none');
  }
}

// * Smaller modified version of the drawAnimalTable from my search.js file that works for the new methods.
function drawAnimalTable(animals){
  eleTbody.innerHTML = '';
  console.log(animals)
  toggleTableVisibility(animals);
  // Changed this to AnimalData for it to get the stuff from the JSON file so I was less confused later.
  for (const animalData of animals){
    const animal = new Animal({
      name: animalData["Animal Name"],
      breed: animalData["Animal Breed"],
      eyes: animalData["Animal Eyes"],
      legs: animalData["Animals Legs"],
      sound: animalData["Animal Sound"]
    });
      const eleRow = eleTbody.insertRow();
      const ownerCell = eleRow.insertCell();
      ownerCell.textContent = "Alyssa";
      const detailsCell = eleRow.insertCell();
      // Changed this to handle the JSON instead.
      // detailsCell.textContent = JSON.stringify(animal);
      detailsCell.textContent = animal.toString();
  }
}

function drawPaginationLinks(elePaginationContainer, currentPage, totalPages) {
  const elePaginationLinks = elePaginationContainer.querySelector('ul.pagination');
  // Clear previous links
  elePaginationLinks.innerHTML = ''; 

  // Previous button that disables once you are no longer allow to go back.
  const prevButton = document.createElement("li");
  prevButton.classList.add("page-item");
  if (currentPage === 1) {
      prevButton.classList.add("disabled");
  }
  // Instead of the link going to the search.html page its going to the ice9.html page. Other than that minor change its the same.
  prevButton.innerHTML = `<a class="page-link" href="ice9.html?page=${currentPage - 1}">Previous</a>`;
  elePaginationLinks.appendChild(prevButton);

  // Added this so that it shows a specific amount of tabs, cuz otherwise I had a crazy amount show up.
  const maxVisiblePages = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxVisiblePages - 1);

  // create the page numbers.
  for (let i = start; i <= end; i++) {
      const elePageItem = document.createElement('li');
      elePageItem.classList.add('page-item');
      if (i === currentPage) {
          elePageItem.classList.add('active');
      } 
      const elePageLink = document.createElement('a');
      elePageLink.classList.add('page-link');
      elePageLink.textContent = i;
      // Changed link.        
      elePageLink.setAttribute('href', `ice9.html?page=${i}`);
      elePageItem.appendChild(elePageLink);
      elePaginationLinks.appendChild(elePageItem);
  }
  // Create "Next" button and disable that when there is no more next.
  const nextButton = document.createElement("li");
  nextButton.classList.add("page-item");
  if (currentPage === totalPages) {
      nextButton.classList.add("disabled");
  }
  // Changed link.
  nextButton.innerHTML = `<a class="page-link" href="ice9.html?page=${currentPage + 1}">Next</a>`;
  elePaginationLinks.appendChild(nextButton);
}

// * Demo stuff. --- This is added to use the new stuff with multiple ways to do the same thing.
// *XRH fetch method.
function xhrAnimals() {
    // creates a new request.
    const request = new XMLHttpRequest();
    request.open("GET", "/data/animals.json");
    //set up a monitor for state changes.
    request.addEventListener("readystatechange", event => {
      const response = event.target;
      if (response.readyState === 1) {console.log('opened')}
      if (response.readyState === 2) {console.log('headers received')}
      if (response.readyState === 3) {console.log('loading')}
      if (response.readyState === 4) {
          console.log('done');
          //This might be something else like animal not animals or something....
          const animal= JSON.parse(response.responseText);
          drawAnimalTable(animal)
          console.log(animal)
      }
    });
    
    request.send();
}

// * Promise fetch method.
function fetchAnimalPromise() {
  const url = new URL('/data/animals.json', window.location.origin);
  const headers = new Headers({
    'Content-Type': 'application/json' // Fixed extra space in key
  });
  const options = {
    method: "GET", 
    headers
  };
  
  const request = new Request(url, options);

  return fetch(request)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); 
    })
    .then(json => {
      console.log("Fetched Data:", json); // Logs the fetched data
      return json; // Returns the data for further use
    })
    .catch(error => { 
      console.log('Fetch error:', error);
      return []; // Return an empty array to prevent breaking the app
    });
}

// * Async/Await fetch method.
async function fetchAnimalAsync() {
  const url = new URL('/data/animals.json', window.location.origin); 
  const headers = new Headers({
    'Content-type': ' application/json'
  });

  const options = {
    method: "GET", 
    headers
  }

  try {
    const request = new Request(url, options);
    const response = await fetch(request);
    if(!response.ok) {
        throw new Error('AH this is wrong')
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.log('oh no!!', error);
  }
}


//  * Rendering Functions.
async function renderAsyncPage() {
  // By default provides and empty array.
  const data = await fetchAnimalAsync() || [];
  // Added this stuff for the pagination
  const totalPages = Math.ceil(data.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedData = data.slice(start, end);

  drawAnimalTable(paginatedData);
  drawPaginationLinks(elePaginationContainer, page, totalPages);
}

function renderXhrPage() {
  xhrAnimals();
}

function renderSyncPage() {
  fetchAnimalPromise();
}

// Using only one method depending on which method I use.
// renderXhrPage();
// renderSyncPage();
renderAsyncPage();
