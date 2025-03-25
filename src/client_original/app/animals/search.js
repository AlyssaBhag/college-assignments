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
import AnimalService from "./animal.service.js"

console.log("we are on the list page rn")

const eleTable = document.getElementById('animals-list');
const eleTbody= document.querySelector('tbody');
const eleMessageBox = document.getElementById('message-box');
const eleSpinIcon = document.getElementById('spinner-icon');
const elePaginationContainer = document.getElementById("pagination-container");
const eleDeleteBtn = document.getElementById('deleteBtn');

const eleSelectedPerPage = document.getElementById('selectedPerPage');
const elePerPageOptions = document.querySelectorAll('.per-page-option');

// Ensure the spinner is hidden initially.
eleMessageBox.classList.remove('d-none');
// Ensure the spinner is hidden initially.
eleSpinIcon.classList.remove('d-none');
//Shows the loading screen once page loads.
eleMessageBox.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Loading Animals From Storage...`;
// Wait for 3 seconds before showing the table.
// ! This is commented out for now.
await waitTho(3000);

const url = new URL(window.location);
const search = url.searchParams;

// I set default values cuz the $ was causing an error.
const page = parseInt(search.get('page') ?? 1);
const perPage = parseInt(search.get('perPage') ?? 5);
console.log(`Page: ${page}, Per Page: ${perPage}`);


async function loadAnimals() {
    try {
        const url = new URL(window.location);
        const perPage = parseInt(url.searchParams.get('perPage')) || 5;
        const page = parseInt(url.searchParams.get('page')) || 1;
        
        const records = await AnimalService.getAllAnimals(); // Ensure records is an array
        console.log("Records Type:", typeof records); // Debugging log
        console.log("Records Content:", records); // Check what is returned

        if (!Array.isArray(records)) {
            throw new Error("getAllAnimals() did not return an array");
        }
        const totalPages = Math.ceil(records.length / perPage);
        const currentRecords = records.slice((page - 1) * perPage, page * perPage);
        console.log("Retrieved records:", currentRecords);

        drawAnimalTable(currentRecords);
        drawPaginationLinks(elePaginationContainer, page, totalPages);
    } catch (error) {
        console.error("Error loading animals:", error);
        eleMessageBox.textContent = "Error loading animals. Please try again later.";
        eleMessageBox.classList.remove('d-none');
    }
}

// ! Had to make these two functions for the drop down menu.
// It is basically a event handler when the drop down is clicked. Changing the page numbers and the record amount.
// Update the dropdown display with the selected value
if (eleSelectedPerPage) {
    eleSelectedPerPage.textContent = perPage;
}

// Attach event listeners to the dropdown options
if (elePerPageOptions) {
    elePerPageOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            const newPerPage = parseInt(option.getAttribute('data-value'));

            // Update selected perPage value
            eleSelectedPerPage.textContent = newPerPage;

            // Update the URL query parameter
            const url = new URL(window.location);
            url.searchParams.set('perPage', newPerPage);
            window.history.pushState({}, '', url); // Update URL without reloading

            // Reload the animals with the new perPage value
            loadAnimals();
        });
    });
}

function waitTho (ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

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

    // Get current perPage from the URL
    const url = new URL(window.location);
    const perPage = parseInt(url.searchParams.get('perPage')) || 5;

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

function getCurrentUserId() {
    return localStorage.getItem("userId") || "AlyssaBhag";
}

// ! Changing anything that takes the params as animals to records.
function drawAnimalTable(records) {
    eleTbody.innerHTML = '';
    console.log(records);
    toggleTableVisibility(records);

    const currentUserId = getCurrentUserId(); 

    for (const animal of records) {
        const eleRow = eleTbody.insertRow();
        const ownerCell = eleRow.insertCell();
        ownerCell.textContent = "Alyssa";

        const detailsCell = eleRow.insertCell();
        detailsCell.textContent = animal.toString();

        const controlsCell = eleRow.insertCell();

        const eleEditLink = document.createElement('a');
        eleEditLink.classList.add('btn', 'btn-primary');
        eleEditLink.innerHTML = `<i class="fas fa-edit"></i>`;

        if (animal._id) {
            eleEditLink.setAttribute('href', `create.html?id=${animal._id}`);
        } else {
            console.error("Error: Animal has no ID", animal);
        }

        controlsCell.append(eleEditLink);

        const eleDelete = document.createElement('i');
        eleDelete.classList.add("btn", "btn-danger");
        eleDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
        eleDelete.addEventListener('click', onDeleteClick(animal));
        controlsCell.append(eleDelete);
    }
}

function onDeleteClick(animal) {
    return async () => {
        const eleModalWindow = document.getElementById('ConfirmModal');
        const modal = new bootstrap.Modal(eleModalWindow);

        eleModalWindow.querySelector('.btn-danger').addEventListener('click', async () => {
            try {
                document.querySelectorAll('.btn').forEach(btn => btn.disabled = true);
                eleMessageBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting animal...';
                eleMessageBox.classList.remove('d-none');

                modal.hide();

                await waitTho(3000);

                await AnimalService.deleteAnimal(animal._id);
                const records = await AnimalService.getAllAnimals();

                toggleTableVisibility(records);

                if (records.length === 0) {
                    eleMessageBox.innerHTML = "No animals found.";
                    eleMessageBox.classList.remove('d-none');
                } else {
                    eleMessageBox.classList.add('d-none');
                }

                window.location.href = 'search.html';

            } catch (error) {
                eleMessageBox.textContent = `Error deleting animal: ${error.message}`;
                eleMessageBox.classList.remove('d-none');
                document.querySelectorAll('.btn').forEach(btn => btn.disabled = false);
            }
        });

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


// Call the function
loadAnimals();
// gets the records of the animals. shows the tables animal list.
// drawAnimalTable(currentRecords);
// drawPaginationLinks(elePaginationContainer, page, totalPages);