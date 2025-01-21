/*
Name: Alyssa Bhagwandin
Filename: search.js
Course: INFT 2202
Created Date: January 8th, 2024
Last Edited Date: January 8th, 2024
Description: This is my list.js/now the search.js file
*/

import animalMockService from "../animal.mock.service.js"
console.log("we are on the list page rn")

const eleTable = document.getElementById('animals-list');
const eleTbody= document.querySelector('tbody');
const eleMessageBox = document.getElementById('message-box');
const records = animalMockService.listAnimals()


// Debugging.
console.log("Retrieved records:", records);

function toggleTableVisibility (animals){
    if (animals.length === 0) {
        eleMessageBox.classList.remove('d-none');
        // eleTbody.classList.add('d-none');
        eleTable.classList.add('d-none');
    } else {
        eleMessageBox.classList.add('d-none')
        eleTable.classList.remove('d-none');
        // drawAnimalTable(animals);
    }
}
// console.log(eleTbody)

function drawAnimalTable(animals){

    // Clear existing rows in tbody
    eleTbody.innerHTML = '';

    // console.log(animals)
    toggleTableVisibility(animals);

    for (const animal of animals){

        const eleRow = eleTbody.insertRow();

        const ownerCell = eleRow.insertCell();
        // ownerCell.textContent = "Alyssa";
        ownerCell.textContent = "Alyssa";

        const detailsCell = eleRow.insertCell();
        detailsCell.textContent = animal.toString();

        const controlsCell = eleRow.insertCell();

        const eleEditLink = document.createElement('i');
        eleEditLink.classList.add('btn', 'btn-primary');
        eleEditLink.innerHTML = '<i class="fa-solid fa-pen"></i>';
        controlsCell.append(eleEditLink);

        // Add edit icon to the link
        const eleDelete = document.createElement('button');
        eleDelete.classList.add("btn", "btn-danger");
        eleDelete.innerHTML = '<i class="fa-solid fa-trash"></i>'; 
        controlsCell.append(eleDelete);
    }
}

drawAnimalTable(records);


        // const detailsCell = eleRow.insertCell();
        //The icon needs to be the one it should be in.
        // detailsCell.textContent = "test2";
        // const controlsCell = row.insertCell();

        // eleDelete = document.createElement('i');
        // eleDelete.classList.add('btn', 'btn-danger');
        // const eleDeleteIcon = document.createElement('i');
        // eleDeleteIcon.classList.add('fa-solid', 'fa-times');
        // eleDeleteLink.append(eleDeleteIcon);
        // eleDelete.append(eleDeleteLink);
