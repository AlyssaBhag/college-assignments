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
// export default new AnimalService()

// service constructor updated. Instead of calling the local host, you get the API key and the url for the website.
class AnimalService {
    constructor() {
        this.apikey = '24825d3a-0291-4360-957a-425ccdea8b68';
        this.host = 'http://localhost:3000';
    }

    // Changed this to 20 pages because it will be long.
    async getAnimals(page = 1, perPage = 5) {
        const url = new URL("/api/animals/search", this.host);
        url.search = new URLSearchParams({ page, perPage });

        const headers = new Headers({
            'apikey': this.apikey,
            'Content-Type': 'application/json'
        });

        const options = {
            method: "GET",
            headers
        };

        const request = new Request(url, options);

        try {
            const response = await fetch(request);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error fetching animals: ${response.statusText} - ${errorText}`);
            }

            const { records } = await response.json();
            console.log("API Response from getAllAnimals():", { records });

            if (!records || !Array.isArray(records)) {
                throw new Error("Invalid API response: expected an array in records");
            }

            return records.map(animal => new Animal(animal));

        } catch (err) {
            console.error("Error fetching animals:", err);
            return [];
        }
    }
}

AnimalService.prototype.getAllAnimals = async function () {
    return this.getAnimals(1, 1000); 
};

AnimalService.prototype.findAnimal = async function (_id) {
    const url = new URL(`/api/animals/${_id}`, this.host);

    const headers = new Headers({
        'apikey': this.apikey,
        'Content-Type': 'application/json'
    });

    const options = {
        method: "GET",
        headers
    };

    const request = new Request(url, options);

    try {
        const response = await fetch(request);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Animal not found: ${response.status} - ${errorText}`);
            return null;
        }

        const responseData = await response.json();
        console.log("API Response from findAnimal():", responseData);

        // Adjusting to handle the actual response structure
        const foundAnimal = new Animal(responseData);

        if (!foundAnimal) {
            throw new Error('Error: That animal does not exist.');
        }

        return foundAnimal;
    } catch (err) {
        console.error('Error finding animal:', err.message);
        return null;
    }
};

AnimalService.prototype.createAnimal = async function (animalObject) {
    const url = new URL('/api/animals/', this.host);

    const headers = new Headers({
        'content-type': 'application/json',
        'apikey': this.apikey
    });

    const options = {
        headers,
        method: 'POST',
        body: JSON.stringify(animalObject)
    };

    const request = new Request(url, options);

    try {
        const response = await fetch(request);
        if (!response.ok) throw new Error(`Error creating animal: ${response.statusText}`);

        const data = await response.json();
        console.log(data);
        return true;
    } catch (err) {
        console.error('Error creating animal:', err);
        throw err;
    }
};

AnimalService.prototype.updateAnimal = async function (animalObject) {
    const url = new URL(`/api/animals/${animalObject._id}`, this.host);

    const headers = new Headers({
        'apikey': this.apikey,
        'Content-Type': 'application/json'
    });

    const options = {
        method: "PUT",
        headers,
        body: JSON.stringify(animalObject)
    };

    const request = new Request(url, options);

    try {
        const response = await fetch(request);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error updating animal: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log("API Response from updateAnimal():", data);
        return true;
    } catch (err) {
        console.error("Error updating animal:", err);
        throw err;
    }
};

AnimalService.prototype.deleteAnimal = async function (_id) {
    const url = new URL(`/api/animals/${_id}`, this.host);

    const headers = new Headers({
        'apikey': this.apikey,
        'Content-Type': 'application/json'
    });

    const options = {
        method: "DELETE",
        headers
    };

    const request = new Request(url, options);

    try {
        const response = await fetch(request);
        if (!response.ok) throw new Error(`Error deleting animal: ${response.statusText}`);

        const data = await response.json();
        console.log(data);
        return true;
    } catch (err) {
        console.error("Error deleting animal:", err);
        throw err;
    }
};

// timeout for spinner
AnimalService.prototype.waitTho = function (time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
};

export default new AnimalService();