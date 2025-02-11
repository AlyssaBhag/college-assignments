/*
Name: Alyssa Bhagwandin
Filename: search.js
Course: INFT 2202
Created Date: January 8th, 2025
Last Edited Date: January 30th, 2025
Description: This is my list.js/now the search.js file
*/

// ! important comments.
// TODO: comments.
// * Highlighted comments.

// import animalMockService from "./animal.mock.service.js"
import animalService from "./animal.service.js"

console.log("we are on the list page rn")

const eleTable = document.getElementById('animals-list');
const eleTbody= document.querySelector('tbody');
const eleMessageBox = document.getElementById('message-box');
const eleSpinIcon = document.getElementById('spinner-icon');
const elePaginationContainer = document.getElementById("pagination-container");
const eleDeleteBtn = document.getElementById('deleteBtn');
// const records = {pagination, pagination.pages, pagination.perPage};
// const records = {Pagination, page, totalPages};



// Ensure the spinner is hidden initially.
eleMessageBox.classList.remove('d-none');
// Ensure the spinner is hidden initially.
eleSpinIcon.classList.remove('d-none');
//Shows the loading screen once page loads.
eleMessageBox.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Loading Animals From Storage...`;
// Wait for 3 seconds before showing the table.
// ! This is commented out for now.
// await waitTho(3000);

const url = new URL(window.location);
const search = url.searchParams;

// I set default values cuz the $ was causing an error.
const page = parseInt(search.get('page') ?? 1);
const perPage = parseInt(search.get('perPage') ?? 5);
console.log(`Page: ${page}, Per Page: ${perPage}`);

// Get all records
// const records = animalMockService.getAllAnimals() // page, perPage
const records = animalService.getAllAnimals() 
console.log('All the stuff in local storage rn:', records); 

// Calculate total pages
const totalPages = Math.ceil(records.length / perPage);
console.log('Total pages:', totalPages);

// Calculate which animals to show based on the current page
const currentRecords = records.slice((page - 1) * perPage, page * perPage);

// console.log("Retrieved records:", records);

// This is a function defined to count the seconds before it has to reload the page.

function waitTho (ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// ? This needs to read the stuff for the table .
// This function shows the visibility of the table of animals when made..
function toggleTableVisibility (records){
    if (records.length === 0) {
        //Added this here so when theres nothing in the table it shows the msg.
        eleMessageBox.innerHTML = "There are currently no animals available in your local storage.";
        eleMessageBox.classList.remove('d-none');
        eleTable.classList.add('d-none');
    } else {
        eleMessageBox.classList.add('d-none')
        eleTable.classList.remove('d-none');
    }
}
// console.log(eleTbody)

// This handles all of the page stuff, to understand when something need to have more pages dependent on how many animals are there.
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

// ! Changing anything that takes the params as animals to records.
function drawAnimalTable(records){

    // Clears the Tbody.
    // eleTbody.replaceChild();
    eleTbody.innerHTML = '';

    // console.log(animals)
    console.log(records)
    toggleTableVisibility(records);

    for (const animal of records){

        const eleRow = eleTbody.insertRow();
        const ownerCell = eleRow.insertCell();
        // * Changed this to take the owners name(whatever in the local storage as the owners name.)
        ownerCell.textContent = animal.owner.githubId;
        // in here you can do ownerCell.innerHTML = something and get the id and show the images of the github ID.

        const detailsCell = eleRow.insertCell();
        detailsCell.textContent = animal.toString();

        const controlsCell = eleRow.insertCell();

        const eleEditLink = document.createElement('a');

        eleEditLink.classList.add('btn', 'btn-primary');
        eleEditLink.innerHTML = `<i class="fas fa-edit"</i>`;
        // 
        eleEditLink.setAttribute('href', `create.html?id=${animal.id}`);
        
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
        eleModalWindow.querySelector('.btn-danger').addEventListener('click', async () => {
            try {
                // Show the spinner before deleting
                eleSpinIcon.classList.remove('d-none');
                        
                // Change the icon to a spinner
                eleDeleteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting an animal from storage...';


                // Wait 3 seconds before proceeding.
                await new Promise(resolve => setTimeout(resolve, 3000));

                // Delete the animal.
                animalMockService.deleteAnimal(animal.id);
                // Get the updated list of animals
                // const animals = animalMockService.getAllAnimals();
                // ! New version.
                const animals = animalService.getAllAnimals();

                // ! Updated this.
                // Update the visibility of the table based on the number of animals
                toggleTableVisibility(records);
                // If the animal list is empty, show the message box, otherwise hide it
                // ! Changed this also
                if (records.length === 0) {
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
                // ! Calls three params 
                // Reload the page after deletion.
                // window.location.reload();
                window.location.href = 'search.html';

            } catch (error) {
                eleMessageBox.textContent = error.message;
                eleMessageBox.classList.add('d-none');
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
        // After confirmation it redirects the page... I can also do refresh but it only rereshed it and not changes you back to the page you need.
        window.location = 'search.html';
        // Close the modal after confirmation.
        modal.hide(); 
    };
}

// gets the records of the animals. shows the tables animal list.
drawAnimalTable(currentRecords);
drawPaginationLinks(elePaginationContainer, page, totalPages);