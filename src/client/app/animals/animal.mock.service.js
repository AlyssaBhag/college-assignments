/*
Name: Alyssa Bhagwandin
Filename: animal.mock.service.js
Course: INFT 2202
Created Date: January 20th, 2025
Updated last Date: January 22nd, 2025
Description: This is my animal.mock.service.js file
*/

/// look up jsdoc.


import Animal from "./animal.js";
// Function gets hosited, put here for visibility
export default new AnimalService()


// service constructor.
function AnimalService() {
    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

// Gets the list of all of the animals when the user enters the stuff in the create.html page.
// replaces the old one.
AnimalService.prototype.getAnimals = function (page = 1, perPage = 10) {
    const animals = JSON.parse(localStorage.getItem('animals')) || [];
    
    // Calculate pagination boundaries
    const first = (page - 1) * perPage;
    const last = first + perPage;

    // Paginate and map to Animal instances
    return animals.slice(first, last)
        .map(animalObject => new Animal(animalObject));
};

// create a new method to count the amount of animals.
AnimalService.prototype.getAnimalsCount = function() {
    return JSON.parse(localStorage.getItem('animals')).length
}

// find the index of an animal by there name.
AnimalService.prototype.findAnimal = function(name){
    const animals = this.getAnimals();
    const animal = find(a => a.name === name) ?? null;
    // const animal = animals.find(animal => String(animal.id) === String(id));
    // animals.find(a => a.name === name) ?? null;

    if (!animals) {
        // console.log("are you stoping here?")
        throw new Error("That animal doesnt exist! Please try again with a valid animal.")
    };
    // console.log("are you stoping here?")
    return new Animal(animals);
}

// Creates a new animal.
AnimalService.prototype.createAnimal = function(animalObject){
    const animals = this.getAnimals();
    if (animals.find(a => a.name === animalObject.name)) {
        throw new Error("This animal name already exist! Please try again with another one.");
    }
    // Note: took out the JSON() function from here. 
 
    animals.push(animalObject);
    localStorage.setItem('animals', JSON.stringify (animals));

    return true;
}

// Update an animal.
AnimalService.prototype.updateAnimal = function(updateAnimal) {
    const animals = this.getAnimals();
    const index = animals.findIndex(a => a.id === updateAnimal.id);

    if (index === -1) {
        throw new Error("Animal not found. Cannot update.");
    }

    // I removed the toObject from here.
    animals[index] = updateAnimal;
    localStorage.setItem('animals', JSON.stringify(animals));
    
    return true;

}

// Delete the animal.
AnimalService.prototype.deleteAnimal = function(id) {
    const animals = this.getAnimals();
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

