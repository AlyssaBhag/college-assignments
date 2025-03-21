/*
Name: Alyssa Bhagwandin
Filename: animal.js
Course: INFT 2202
Created Date: January 16th, 2024
Last Edited Date: February 10th, 2025
Description: This is my animal.js file
*/

export default class Animal {
    constructor({_id = null, name, breed, eyes, legs, sound, owner = null}) {
        // this._id = _id || crypto.randomUUID();
        this._id = _id ? _id : new mongoose.Types.ObjectId();
        Object.assign(this, {name, breed, eyes, legs, sound, owner });
    }

    toString() {
        return `${this.name} is  a ${this.breed} with ${this.eyes} eyes, ${this.legs} legs, and sound like ${this.sound}`;
    
    }

    toJSON() {
        return {
            id: this._id,
            name: this.name,
            breed: this.breed,
            eyes: this.eyes,
            legs: this.legs,
            sound: this.sound,
            owner: this.owner
        };
    }
}
