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
// const records = {pagination, pagination.pages, pagination.perPage};
// const records = {Pagination, page, totalPages};
// Added these for the dropdwon bar.
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

        // ! Even tho i literally defined this right above it would not read it.
        // ! I am so sleepy rn and this was my only solution I will come back to this.
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
// It is basically a event handler when the drop down is clicked. Chnahiog the page numbers and the record amount.
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
    return localStorage.getItem("userId") || "AlyssaBhag"; // Modify this based on your authentication system
}

// ! Changing anything that takes the params as animals to records.
function drawAnimalTable(records){

    // Clears the Tbody.
    // eleTbody.replaceChild();
    eleTbody.innerHTML = '';

    // console.log(animals)
    console.log(records)
    toggleTableVisibility(records);

    // Get the currently logged-in user's GitHub ID (Modify this based on your login system)
    const currentUserId = getCurrentUserId(); 

    for (const animal of records){

        const eleRow = eleTbody.insertRow();
        const ownerCell = eleRow.insertCell();
        // * Changed this to take the owners name(whatever in the local storage as the owners name.)
        // ownerCell.textContent = animal.owner.githubId;
        // in here you can do ownerCell.innerHTML = something and get the id and show the images of the github ID.
        ownerCell.innerHTML = `<img src="https://avatars.githubusercontent.com/${animal.owner.githubId}?size=40" 
        alt="${animal.owner.githubId}'s Avatar" class="rounded-circle me-2" width="40" height="40">
        ${animal.owner.githubId}`;
    
    
        const detailsCell = eleRow.insertCell();
        detailsCell.textContent = animal.toString();

        const controlsCell = eleRow.insertCell();

        const eleEditLink = document.createElement('a');

        eleEditLink.classList.add('btn', 'btn-primary');
        eleEditLink.innerHTML = `<i class="fas fa-edit"</i>`;
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

        // 🔹 Disable buttons if the current user is NOT the owner
        if (animal.owner.githubId !== currentUserId) {
            eleEditLink.disabled = true;
            eleDelete.disabled = true;
            eleEditLink.classList.add('disabled');
            eleDelete.classList.add('disabled');
        }
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
                // Disable all action buttons to prevent multiple clicks
                document.querySelectorAll('.btn').forEach(btn => btn.disabled = true);

                // Show loading spinner in message box
                eleMessageBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting animal...';
                eleMessageBox.classList.remove('d-none');

                modal.hide();

                // Wait for 3 seconds before refreshing the page
                await waitTho(3000);

                // Call API to delete the animal
                await AnimalService.deleteAnimal(animal.id);
                // Fetch the updated animal list
                const records = await AnimalService.getAllAnimals();

                // ! Updated this.
                // Update the visibility of the table based on the number of animals
                toggleTableVisibility(records);
                // If the animal list is empty, show the message box, otherwise hide it
                // ! Changed this also
                if (records.length === 0) {
                    eleMessageBox.innerHTML = "No animals found.";
                    eleMessageBox.classList.remove('d-none');
                    console.log("Hallo is this showing")
                } else {
                    eleMessageBox.classList.add('d-none');
                }

                window.location.href = 'search.html';

            } catch (error) {
                eleMessageBox.textContent = `Error deleting animal: ${error.message}`;
                eleMessageBox.classList.remove('d-none');
                // console.error(error);
                
                // Re-enable buttons in case of failure
                document.querySelectorAll('.btn').forEach(btn => btn.disabled = false);
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


// Call the function
loadAnimals();
// gets the records of the animals. shows the tables animal list.
// drawAnimalTable(currentRecords);
// drawPaginationLinks(elePaginationContainer, page, totalPages);