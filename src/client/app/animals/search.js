/*
Name: Alyssa Bhagwandin
Filename: search.js
Course: INFT 2202
Created Date: January 8th, 2025
Last Edited Date: January 20th, 2025
Description: This is my list.js/now the search.js file
*/

import animalMockService from "./animal.mock.service.js"

console.log("we are on the list page rn")

const eleTable = document.getElementById('animals-list');
const eleTbody= document.querySelector('tbody');
const eleMessageBox = document.getElementById('message-box');
const elePaginationContainer = document.getElementById("pagination-container");

const url = new URL(window.location);
const search = url.searchParams;

// I set default values cuz the $ was causing an error.
const page = parseInt(search.get('page') ?? 1);
const perPage = parseInt(search.get('perPage') ?? 5);
console.log(`Page: ${page}, Per Page: ${perPage}`);

// Get all records
const records = animalMockService.getAllAnimals() // page, perPage
console.log('All the stuff in local storage rn:', records); 

// Calculate total pages
const totalPages = Math.ceil(records.length / perPage);
console.log('Total pages:', totalPages);

// Calculate which animals to show based on the current page
const currentRecords = records.slice((page - 1) * perPage, page * perPage);



// Debugging.
// console.log("Retrieved records:", records);

function toggleTableVisibility (animals){
    if (animals.length === 0) {
        eleMessageBox.classList.remove('d-none');
        eleTable.classList.add('d-none');
        //
        // elePaginationContainer.classList.add("d-none");
    } else {
        eleMessageBox.classList.add('d-none')
        eleTable.classList.remove('d-none');
        //
        // elePaginationContainer.classList.remove("d-none");
    }
}
// console.log(eleTbody)

function drawPaginationLinks(elePaginationContainer, currentPage, totalPages) {
    const elePaginationLinks = elePaginationContainer.querySelector('ul.pagination');
    // Clear previous links
    elePaginationLinks.innerHTML = ''; 

    // Create "Previous" button that disables once you are no longer allow to go back.
    const prevButton = document.createElement("li");
    prevButton.classList.add("page-item");
    if (currentPage === 1) {
        prevButton.classList.add("disabled");
    }

    prevButton.innerHTML = `<a class="page-link" href="search.html?page=${currentPage - 1}">Previous</a>`;
    elePaginationLinks.appendChild(prevButton);

    // create the page links
    for (let i = 1; i <= totalPages; i++) {
        const elePageItem = document.createElement('li');
        elePageItem.classList.add('page-item');
        if (i === currentPage) {
            elePageItem.classList.add('active');
        }

        const elePageLink = document.createElement('a');
        elePageLink.classList.add('page-link');
        elePageLink.textContent = i;
        elePageLink.setAttribute('href', `search.html?page=${i}`);

        elePageItem.appendChild(elePageLink);
        elePaginationLinks.appendChild(elePageItem);
    }
    // Create "Next" button and disable that when there is no more next.
    const nextButton = document.createElement("li");
    nextButton.classList.add("page-item");
    if (currentPage === totalPages) {
        nextButton.classList.add("disabled");
    }

    nextButton.innerHTML = `<a class="page-link" href="search.html?page=${currentPage + 1}">Next</a>`;
    elePaginationLinks.appendChild(nextButton);
}


function drawAnimalTable(animals){

    // Clears the Tbody.
    // eleTbody.replaceChild();
    eleTbody.innerHTML = '';

    console.log(animals)
    toggleTableVisibility(animals);

    for (const animal of animals){

        const eleRow = eleTbody.insertRow();

        const ownerCell = eleRow.insertCell();
        ownerCell.textContent = "Alyssa";

        const detailsCell = eleRow.insertCell();
        detailsCell.textContent = animal.toString();

        const controlsCell = eleRow.insertCell();

        const eleEditLink = document.createElement('a');

        eleEditLink.classList.add('btn', 'btn-primary');
        eleEditLink.innerHTML = `<i class="fas fa-edit"</i>`;
        // 
        eleEditLink.setAttribute('href', `create.html?id=${animal.id}`);

        ;
        // Add tooltip and its text.
        eleEditLink.setAttribute('data-bs-toggle', 'tooltip'); 
        eleEditLink.setAttribute('title', 'Click here to update your animal!'); 

        // eleEditLink.addEventListener('click', onUpdateClick(animal));
        controlsCell.append(eleEditLink);

        const eleDelete = document.createElement('i');
        eleDelete.classList.add("btn", "btn-danger");
        eleDelete.innerHTML = '<i class="fa-solid fa-trash"></i>'; 
        // 
        eleDelete.addEventListener('click', onDeleteClick(animal));
        // Add tooltip and its text.
        eleDelete.setAttribute('data-bs-toggle', 'tooltip'); 
        eleDelete.setAttribute('title', 'Click here to delete your animal :(');   
        controlsCell.append(eleDelete);
    }
}

function onDeleteClick(animal){
    return () => {
        // console.log(`clicked ${animal.id}`);
        // Add this to use the modal instead of the old ugly method.
        const eleModalWindow = document.getElementById('ConfirmModal');
        const modal = new bootstrap.Modal(eleModalWindow);

        // Event listeners for confirm and delete buttons
        eleModalWindow.querySelector('.btn-danger').addEventListener('click', () => {
            try {
                // Delete the animal
                animalMockService.deleteAnimal(animal.id);
                // Get the updated list of animals
                const animals = animalMockService.getAllAnimals();
                // Update the visibility of the table based on the number of animals
                toggleTableVisibility(animals);
                // If the animal list is empty, show the message box, otherwise hide it
                if (animals.length === 0) {
                    eleMessageBox.classList.remove('d-none');
                    console.log("Hallo is this showing")
                } else {
                    eleMessageBox.classList.add('d-none');
                }

                // Pagination logic. Slice the list to get only the animals for the current page
                const currentPage = records.slice((page - 1) * perPage, page * perPage);
                // Draw the table with the current page's animals
                drawAnimalTable(currentPage);

                drawPaginationLinks(elePaginationContainer, page, totalPages);
                
                // Reload the page after deletion.
                // window.location.reload();
                window.location.href = 'search.html';

            } catch (error) {
                eleMessageBox.textContent = error.message;
                eleMessageBox.classList.remove('d-none');
                // console.error(error);
            }
            // Close the modal.
            modal.hide();
        });

        // Add another event listener to handle confirmation actions
        eleModalWindow.querySelector('.btn-danger').addEventListener('click', () => {
            console.log(`Confirmed action for animal: ${animal.name}`);
            // Close the modal after confirmation
            modal.hide(); 
        });

        // Show the modal.
        modal.show(); 
    };
}

// Function to handle the "Confirm" button for the function above.
function onConfirm(animal, modal) {
    return () => {
        console.log(`Confirmed action for animal: ${animal.name}`);
        // After consfirmation it redirects the page... I can also do refresh but it only rereshed it and not changes you back to the page you need.
        window.location = 'search.html';
        // Close the modal after confirmation.
        modal.hide(); 
    };
}

// gets the records of the animals. shows the tables animal list.
drawAnimalTable(currentRecords);
drawPaginationLinks(elePaginationContainer, page, totalPages);