/*
Name: Alyssa Bhagwandin
Filename: animal.service.js
Course: INFT 2202
Created Date: January 8th, 2024
Last Edited Date: February 10th, 2025
Description: This is my animal.service.js file
*/

import Animal from "./animal.js";
// Calls the function for visibility.
export default new AnimalService()


// service constructor updated.Instead of calling the local host, you get the API key and the url for the website.
function AnimalService() {
    this.apikey = '24825d3a-0291-4360-957a-425ccdea8b68';
    this.host = 'https://inft2202.opentech.durhamcollege.org';
    
    }

    // Changed this to 20 pages because it will be long.
AnimalService.prototype.getAnimals = async function (page = 1, perPage = 5) {
    const url = new URL("/api/animals", this.host);
    url.search = new URLSearchParams({page, perPage});
    const request = new Request(url, options);
    // console.log(url);
    // console.log(pagination, records)

    const headers = new Headers ({
        'apikey': this.apikey,
        'Content-Type': 'application/json'
    })

    const options = {
        method: "GET",
        headers
    };


    try{
        const response = await fetch (request);

        if (!response.ok) {
            throw new Error(`Error fetching animals: ${response.statusText}`);
        }

        const { pagination, records } = await response.json();
        
        return {
            pagination,
            records: records.map(animal => new Animal(animal))
        };
    }catch (err) {
        console.log(pagination, records);
        console.error("Error fetching animals:", err);
        throw err;
    }
}




// //  Update an animal.
// AnimalService.prototype.updateAnimal = function(updateAnimal) {
//     const animals = this.getAllAnimals();
//     const index = animals.findIndex(a => a.id === updateAnimal.id);

//     if (index === -1) {
//         throw new Error("Animal not found. Cannot update.");
//     }
//     animals[index] = updateAnimal;
//     localStorage.setItem('animals', JSON.stringify(animals));
    
//     return true;

// }

// // Delete the animal.
// AnimalService.prototype.deleteAnimal = function(id) {
//     const animals = this.getAllAnimals();
//     const index = animals.findIndex(a => a.id === id);
//     // console.log("hello i am reaching here ")
//     // console.log("Animal ID to delete:", animalId);
//     if (index === -1) {
//         throw new Error("That animal doesn't exist. Please try again.");
//     }
    
//     animals.splice(index, 1);
//     localStorage.setItem('animals', JSON.stringify(animals));
//     // console.log("hello i am reaching here ")
//     return true;
//     };

