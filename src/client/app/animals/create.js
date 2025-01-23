/*
Name: Alyssa Bhagwandin
Filename: create.js
Course: INFT 2202
Created Date: January 13th, 2025
Description: This is my create.js file
*/

// I used this refernce for the !isNaN thingy: https://www.geeksforgeeks.org/number-validation-in-javascript/

// console.log("Hello")

import Animal from './animal.js'; 
import animalMockService from './animal.mock.service.js';

const url = new URL(window.location);
const searchParams = url.searchParams;
const editId = searchParams.get('id');
const isEditMode = editId ? true : false;

if(isEditMode) {
    setupEditForm();
}

// Ended up making this into a if statement.
const eleForm = document.getElementById('animal-form');
if (eleForm) {
    eleForm.addEventListener('submit', submitAnimalForm);
}
  

function setupEditForm() {
    const eleheading = document.querySelector('h1');
    eleheading.textContent = "Editing Existing Animal List";

    // const existingAnimal = animalMockService.findAnimal(editId);

    // Retrieve the animals from localStorage cuz it kept saying "undefined" and i was so lost for
    const animal = JSON.parse(localStorage.getItem('animals'));
    // Find the animal by its id
    const existingAnimal = animal.find(animals => animals.id === editId);

    // console.log(JSON.parse(localStorage.getItem('animals')));

    // console.log(existingAnimal);
    
    if (existingAnimal) {
        const eleAnimalForm = document.getElementById('animal-form');
        // const existingAnimal = animalMockService.findAnimal(editId);
        // Does the edit stuff and gives the fields it can edit.
        eleAnimalForm.id.value = existingAnimal.id;
        eleAnimalForm.name.value = existingAnimal.name;
        eleAnimalForm.name.disabled = true;
        eleAnimalForm.breed.value = existingAnimal.breed;   
        eleAnimalForm.eyes.value = existingAnimal.eyes;  
        eleAnimalForm.legs.value = existingAnimal.legs;
        eleAnimalForm.sound.value = existingAnimal.sound;
        // console.log(existingAnimal);
    } else {
        alert("Animal not found!");
        // Redirect back if animal is not found
        window.location.href = "search.html";   
    }
}



function submitAnimalForm(event) {
    event.preventDefault();
    
    const animalForm = event.target;
    const messageBox = document.getElementById('message-box');
    // Spinner stuff for later when it the form get submitted correctly.
    const spinner = document.getElementById('spinner');
    // const eleNameError = animalForm.name.nextElementSibling;
    const valid = validateAnimalForm(animalForm);
    

    // Clear previous messages.
    messageBox.classList.add('d-none');
    // eleNameError.classList.add('d-none');

    if (valid){
        // const animalParms = {}
        console.log('valid, lets save the animal!');
        const animalObject = new Animal ({
            id: animalForm.id.value,
            name: animalForm.name.value,
            breed: animalForm.breed.value,
            eyes: animalForm.eyes.value,
            legs: animalForm.legs.value,
            sound: animalForm.sound.value,
        });

        // console.log(animalObject.id)
        console.log(animalObject)
        try {

            if(isEditMode){
                animalMockService.updateAnimal(animalObject);
            }else{
                animalMockService.createAnimal(animalObject);
            }
            // Show spinner while processing
            spinner.classList.remove('d-none');

            // // Hide spinner after operation is complete.
            setTimeout(() => {
                spinner.classList.add('d-none');
                alert("Animal created successfully!");
                animalForm.reset();
                window.location.href = "search.html";
            }, 3000); 

        } catch(error){
            // hide the spinner when there are errors.
            spinner.classList.add('d-none'); 
            console.error("Error saving animal:", error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = error.message
        }
        
    }else {
        console.log('not valid')
        messageBox.classList.remove('d-none');
        messageBox.textContent = 'Error! Your form was submitting incorrectly, please try again.'
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