/*
Name: Alyssa Bhagwandin
Filename: create.js
Course: INFT 2202
Created Date: January 13th, 2024
Description: This is my create.js file
*/

// I used this refernce for the !isNaN thingy: https://www.geeksforgeeks.org/number-validation-in-javascript/

// console.log("Hello")

const eleForm = document.getElementById('animal-form')
eleForm.addEventListener('submit', submitAnimalForm);


function submitAnimalForm( event ) {
    event.preventDefault();

    const animalForm = event.target;

    const valid = validateAnimalForm(animalForm);
    const messageBox = document.getElementById('message-box')
    
    if (valid){
        console.log('valid, lets save the animal!');
        const animalObject = {
            name: animalForm.name.value,
            breed: animalForm.breed.value,
            legs: animalForm.legs.value,
            eyes: animalForm.eyes.value,
            sound: animalForm.sound.value,
        };
        console.log(animalObject)
        animalForm.reset();
        messageBox.classList.add('d-none');
    }else {
        console.log('not valid')
        messageBox.classList.remove('d-none');
        messageBox.textContent = 'Error! Your form was submitting incorrectly, please try again.'
    }
    console.log('You tried to submit me!')
}


// function validateAnimalForm(event){
//     console.log("you tried to submit!");
// }

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