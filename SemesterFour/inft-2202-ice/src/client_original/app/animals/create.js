/*
Name: Alyssa Bhagwandin
Filename: create.js
Course: INFT 2202
Created Date: January 13th, 2025
Last Edited Date: February 4th, 2025
Description: This is my create.js file
*/

import Animal from './animal.js'; 
// import animalMockService from './animal.mock.service.js';
import AnimalService from './animal.service.js';

console.log("AnimalService works if it shows here:", AnimalService);
// console.log("is getAllAnimals being seen, if yes this will say function:", typeof animalMockService.getAllAnimals);
console.log('create.js loaded');

console.log("Full URL:", window.location.href);
const searchParams = new URLSearchParams(window.location.search);
const editId = searchParams.get('id'); 
const isEditMode = editId ? true : false;
const eleSubmitBtn = document.getElementById('submitBtn');


if(isEditMode) {
    // animalId = editId;
    setupEditForm(editId);
    console.log("edit")
} else {
    console.log("add")
}

// Ended up making this into a if statement.
const eleForm = document.getElementById('animal-form');
if (eleForm) {
    eleForm.addEventListener('submit', submitAnimalForm);
}

async function setupEditForm(editId) {
    if (!editId || editId === "undefined") {
        console.error("Error: editId is invalid:", editId);
        return;
    }

    const eleheading = document.querySelector('h1');
    eleheading.textContent = "Editing Existing Animal List";
    console.log("Updated the header")
    // const existingAnimal = animalMockService.findAnimal(editId);
    const existingAnimal = await AnimalService.findAnimal(editId);
    
    // console.log(editId)
    if (existingAnimal) {
        console.log("Animal found!", existingAnimal);
        const eleAnimalForm = document.getElementById('animal-form');

        console.log("it is now in the thingy!")
        eleAnimalForm.name.value = existingAnimal.name;
        eleAnimalForm.name.disabled = true;
        eleAnimalForm.breed.value = existingAnimal.breed;   
        eleAnimalForm.eyes.value = existingAnimal.eyes;  
        eleAnimalForm.legs.value = existingAnimal.legs;
        eleAnimalForm.sound.value = existingAnimal.sound;
        // console.log(eleAnimalForm.sound.)
        console.log(existingAnimal);
        // console.log(animals)
    } else {
        // console.log('Animals retrieved from localStorage:', animals);
        
        console.log('URL Search Params:', searchParams);
        console.log('Edit ID:', editId);
        
        alert("Animal not found!");
        // Redirect back if animal is not found
        window.location.href = "search.html";   
    }
}


// ! New function for timeouts.
function waitTho (ms){
    return new Promise((resolve, reject) => setTimeout(resolve, 3000));
}

// ! Made this async to do the wait thing.
async function submitAnimalForm(event) {
    event.preventDefault();
    
    const animalForm = event.target;
    const eleNameError  = document.getElementById('message-box');
    // Spinner stuff for later when it the form get submitted correctly.
    const spinner = document.getElementById('spinner');
    // const eleNameError = animalForm.name.nextElementSibling;
    const valid = validateAnimalForm(animalForm);
    // Clear previous messages.
    eleNameError .classList.add('d-none');
    // eleNameError.classList.add('d-none');

    if (valid){
        console.log('valid, lets save the animal!');
        const animalObject = new Animal ({
            // animalId: editId,
            _id: editId,
            name: animalForm.name.value,
            breed: animalForm.breed.value,
            eyes: animalForm.eyes.value,
            legs: animalForm.legs.value,
            sound: animalForm.sound.value,
        });

        // console.log(animalObject.id)
        console.log(animalObject)
        try {

            // Check if an animal with this name already exists.
            const existingAnimals = await AnimalService.getAllAnimals();
            const duplicate = existingAnimals.find(a => a.name.toLowerCase() === animalObject.name.toLowerCase());

            // if(isEditMode){
            //     animalMockService.updateAnimal(animalObject);
            // } else {
            //     animalMockService.createAnimal(animalObject);
            // }

            if (duplicate && !isEditMode) {
                throw new Error(`Animal with name "${animalObject.name}" already exists.`);
            }

            if (isEditMode) {
                console.log("Editing animal:", editId);
                await AnimalService.updateAnimal(animalObject);
            } else {
                await AnimalService.createAnimal(animalObject);
            }
            
            // Show spinner while processing
            spinner.classList.remove('d-none');
            // Disable the boxes once its processing.
            animalForm.name.disabled = true;
            animalForm.breed.disabled = true;
            animalForm.eyes.disabled = true;
            animalForm.legs.disabled = true;
            animalForm.sound.disabled = true;
            // Disables the submit button as well.
            eleSubmitBtn.disabled = true;
            // Wait for 3 seconds before showing modal
            await waitTho(3000);

            // Show the success modal
            const successModal = new bootstrap.Modal(document.getElementById('SuccessModal'));
            successModal.show();

            // Handle the OK button behavior
            document.getElementById('modal-ok-btn').addEventListener('click', () => {
                    console.log("OK button clicked!");
                    animalForm.reset();
                    window.location.href = "search.html";
            });

        } catch(error){
            // hide the spinner when there are errors.
            spinner.classList.add('d-none'); 
            console.error("Error saving animal:", error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = error.message
        }
    } else {
        console.log('not valid')
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = 'Error! Your form was submitting incorrectly, please try again.'
    }

    console.log('You tried to submit me!')

}

function validateAnimalForm(animalForm){
    // console.log("test if its valid or not");

    let valid = true;
    
    // Validation for the animals name.
    const name = animalForm.name.value;
    const eleNameError = animalForm.name.nextElementSibling;
    if (name === "") {
        valid = false;
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "Name must not be blank"; 
    } else {
        eleNameError.classList.add('d-none');
    }

    // Validation for the animals breed type.
    const breed = animalForm.breed.value;
    const eleBreedError = animalForm.breed.nextElementSibling;
    if (breed === "") {
        valid = false;
        eleBreedError.classList.remove('d-none');
        eleBreedError.textContent = "Breed must not be blank"; 
    }else if (!isNaN(breed)){
        valid = false;
        eleBreedError.classList.remove('d-none');
        eleBreedError.textContent = "Breed must not be a number." 
    } else {
        eleBreedError.classList.add('d-none');
    }

    // Validation for the animals eye count.
    const eyes = animalForm.eyes.value;
    const eleEyesError = animalForm.eyes.nextElementSibling;
    if (eyes === "") {
        valid = false;
        eleEyesError.classList.remove('d-none');
        eleEyesError.textContent = "Eyes must be a numeric value."; 
    }else if (isNaN(eyes)){
        valid = false;
        eleEyesError.classList.remove('d-none');
        eleEyesError.textContent = "Eyes must be a number."    
    } else {
        eleEyesError.classList.add('d-none');
    }

    // Validation for the animals leg count.
    const legs = animalForm.legs.value;
    const eleLegsError = animalForm.legs.nextElementSibling;
    if (legs === "") {
        valid = false;
        eleLegsError.classList.remove('d-none');
        eleLegsError.textContent = "Legs must be a numeric value."; 
    }else if (isNaN(legs)){
        valid = false;
        eleLegsError.classList.remove('d-none');
        eleLegsError.textContent = "Legs must be a number."    
    } else {
        eleLegsError.classList.add('d-none');
    }

    // Validation for the animals sounds.
    const sound = animalForm.sound.value;
    const eleSoundError = animalForm.sound.nextElementSibling;
    if (sound === "") {
        valid = false;
        eleSoundError.classList.remove('d-none');
        eleSoundError.textContent = "Sound must not be blank"; 
    }else if (!isNaN(sound)){
        valid = false;
        eleSoundError.classList.remove('d-none');
        eleSoundError.textContent = "Sound must not be a number." 
    } else {
        eleSoundError.classList.add('d-none');
    }

    return valid;
}