/*
Name: Alyssa Bhagwandin
Filename: animal.js
Course: INFT 2202
Created Date: January 16th, 2024
Description: This is my animal.js file
*/

export default class Animal {
    constructor({id = null, name, breed, eyes, legs, sound}) {
        this.id = id ?? crypto.randomUUID();
        Object.assign(this, {name, breed, eyes, legs, sound });
    }

    toString() {
        return `${this.name} is  a ${this.breed} with ${this.eyes} eyes, ${this.legs} legs, and sound like ${this.sound}`;
    
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            breed: this.breed,
            eyes: this.eyes,
            legs: this.legs,
            sound: this.sound
        };
    }
}


//decon
// const myAnimal = new Animal({
//     name: 'Lion',
//     breed: 'Panthera leo',
//     eyes: 2,
//     legs: 4,
//     sound: 'Roar'
// });
// //decon function.
// myAnimal.destructor();


// const animal = new Animal();
// console.log(animal.toString());