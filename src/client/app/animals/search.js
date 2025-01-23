/*
Name: Alyssa Bhagwandin
Filename: search.js
Course: INFT 2202
Created Date: January 8th, 2025
Last Edited Date: January 20th, 2025
Description: This is my list.js/now the search.js file
*/

import animalMockService from "./animal.mock.service.js"
// import Animal from "./animal.js";
console.log("we are on the list page rn")

const eleTable = document.getElementById('animals-list');
const eleTbody= document.querySelector('tbody');
const eleMessageBox = document.getElementById('message-box');
const records = animalMockService.getAnimals()


// Debugging.
// console.log("Retrieved records:", records);

function toggleTableVisibility (animals){
    if (animals.length === 0) {
        eleMessageBox.classList.remove('d-none');
        eleTable.classList.add('d-none');
    } else {
        eleMessageBox.classList.add('d-none')
        eleTable.classList.remove('d-none');
        // drawAnimalTable(animals);
        //parg thing
    }
}
// console.log(eleTbody)

function drawAnimalTable(animals){

    // Clears the Tbody.
    // eleTbody.replaceChild();
    eleTbody.innerHTML = '';

    // console.log(animals)
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
   
        // eleEditLink.addEventListener('click', onUpdateClick(animal));
        controlsCell.append(eleEditLink);

        const eleDelete = document.createElement('i');
        eleDelete.classList.add("btn", "btn-danger");
        eleDelete.innerHTML = '<i class="fa-solid fa-trash"></i>'; 
        // 
        eleDelete.addEventListener('click', onDeleteClick(animal));
        controlsCell.append(eleDelete);
    }
}



function onDeleteClick(animal){
    return () => {
        console.log(`clicked ${animal.id}`);
        if (confirm('Are you sure you want to delete this animal?')) {
            try {
                animalMockService.deleteAnimal(animal.id)
                const newAnimalList = animalMockService.getAnimals();
                toggleTableVisibility(newAnimalList);
                // If the animal list is empty, show the message box, otherwise hide it
                if (newAnimalList.length === 0) {
                    eleMessageBox.classList.remove('d-none');
                    console.log("Hallo is this showing")
                } else {
                    eleMessageBox.classList.add('d-none');
                }
                // Reload the page after deletion.
                window.location.reload();
            } catch (error) {
                eleMessageBox.classList.add('d-none')
                eleMessageBox.textContent = error.message;
                console.log(error)
            }
        }
    }
}

drawAnimalTable(records);