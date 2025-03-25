/*
Name: Alyssa Bhagwandin
Filename: animal.mock.service.js
Course: INFT 2202
Created Date: January 20th, 2025
Last Edited Date: February 10th, 2025
Description: This is my animal.mock.service.js file
*/

/// look up jsdoc.

import Animal from "./animal.js";
// Function gets hoisted, put here for visibility
export default new AnimalService()

// service constructor.
function AnimalService() {
    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify([]));
    }

AnimalService.prototype.getAnimals = function (page = 1, perPage = 5) {
    // const animals = JSON.parse(localStorage.getItem('animals')) || [];
    
    // Calculate pagination boundaries
    const first = (page - 1) * perPage;
    const last = first + perPage;
    
    const animals = JSON.parse(localStorage.getItem('animals'))
    // Paginate and map to Animal instances
        .map(animalObject => new Animal(animalObject))
        .slice(first, last);
    
    return animals;    
};

AnimalService.prototype.getAllAnimals = function () {
    return JSON.parse(localStorage.getItem('animals')) 
        .map(animalObject => new Animal(animalObject));
};


// create a new method to count the amount of animals.
AnimalService.prototype.getAnimalsCount = function() {
    return JSON.parse(localStorage.getItem('animals')).length
}

// find the index of an animal by there name.
AnimalService.prototype.findAnimal = function(id){
    const animals = this.getAllAnimals();
    return animals.find(a => a.id === id);
}

// Creates a new animal.
AnimalService.prototype.createAnimal = function(animalObject){
    const animals = this.getAllAnimals();
    if (animals.find(a => a.name === animalObject.name)) {
        throw new Error("This animal name already exist! Please try again with another one.");
    }
    animals.push(animalObject);
    localStorage.setItem('animals', JSON.stringify (animals));

    return true;
}

// Update an animal.
AnimalService.prototype.updateAnimal = function(updateAnimal) {
    const animals = this.getAllAnimals();
    const index = animals.findIndex(a => a.id === updateAnimal.id);

    if (index === -1) {
        throw new Error("Animal not found. Cannot update.");
    }
    animals[index] = updateAnimal;
    localStorage.setItem('animals', JSON.stringify(animals));
    
    return true;

}

// Delete the animal.
AnimalService.prototype.deleteAnimal = function(id) {
    const animals = this.getAllAnimals();
    const index = animals.findIndex(a => a.id === id);
    // console.log("hello i am reaching here ")
    // console.log("Animal ID to delete:", animalId);
    if (index === -1) {
        throw new Error("That animal doesn't exist. Please try again.");
    }
    
    animals.splice(index, 1);
    localStorage.setItem('animals', JSON.stringify(animals));
    // console.log("hello i am reaching here ")
    return true;
    };

}