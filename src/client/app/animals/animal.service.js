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

    const headers = new Headers ({
        'apikey': this.apikey,
        'Content-Type': 'application/json'
    })

    const options = {
        method: "GET",
        headers
    };

    try{
        // Create a new Request object with the API URL and options.
        const request = new Request(url, options);
        // Perform the API request and wait for the response
        const response = await fetch (request);

        // If the response is not OK (404, 500), throw an error with details
        if (!response.ok) {
            throw new Error(`Error fetching animals: ${response.statusText}`);
        }
        // ! Convert the response data from JSON format to a JavaScript object. I changed it from the one below.
        // const { pagination, records } = await response.json();
        const data = await response.json(); 
        console.log("API Response from getAllAnimals():", data); // Debugging log

        // Check if the response contains a "records" field and if it's an array.
        if (!data.records || !Array.isArray(data.records)) {
            throw new Error("Invalid API response: expected an array in data.records");
        }

        // Convert each raw animal object into an instance of the Animal class
        return data.records.map(animal => new Animal(animal));
        // ! This was confusing it and it wasn't returning an array.
        // return {
        //     pagination,
        //     records: records.map(animal => new Animal(animal))
        // };

    }catch (err) {
        // Log any errors encountered during the request
        console.error("Error fetching animals:", err);
        // Return an empty array to prevent crashes if the API call fails
        return [];
    }
}


// !
AnimalService.prototype.getAllAnimals = async function () {
    return this.getAnimals(1, 1000); 

};

// Updated version of the find animal function.
AnimalService.prototype.findAnimal = async function (id) {
    const url = new URL(`/api/animals/${id}`, this.host);

    const headers = new Headers ({
        'apikey': this.apikey,
        'Content-Type': 'application/json'
    })

    const options = {
        method: "GET",
        headers
    };


    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Animal not found: ${response.statusText}`);

        return new Animal(await response.json());
    } catch (err) {
        console.error("Error finding animal:", err);
        throw err;
    }
};


// Updated version of the create animal function.
AnimalService.prototype.createAnimal = async function (animalObject) {
    const url = new URL("/api/animals", this.host);

    const headers = new Headers({
        'apikey': this.apikey,
        'Content-Type': 'application/json'
    });

    const options = {
        method: "POST",
        headers,
        body: JSON.stringify(animalObject)
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Error creating animal: ${response.statusText}`);

        return true;
    } catch (err) {
        console.error("Error creating animal:", err);
        throw err;
    }
};


// Updated version of the update animal function.
AnimalService.prototype.updateAnimal = async function (updateAnimal) {
    const url = new URL(`/api/animals/${updateAnimal.id}`, this.host);

    const headers = new Headers({
        'apikey': this.apikey,
        'Content-Type': 'application/json'
    });

    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify(updateAnimal)
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Error updating animal: ${response.statusText}`);

        return true;
    } catch (err) {
        console.error("Error updating animal:", err);
        throw err;
    }
};


// Updated version of the delete animal function.
AnimalService.prototype.deleteAnimal = async function (id) {
    const url = new URL(`/api/animals/${id}`, this.host);

    const headers = new Headers({
        'apikey': this.apikey,
        'Content-Type': 'application/json'
    });

    const options = {
        method: "DELETE",
        headers
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Error deleting animal: ${response.statusText}`);

        return true;
    } catch (err) {
        console.error("Error deleting animal:", err);
        throw err;
    }
};
