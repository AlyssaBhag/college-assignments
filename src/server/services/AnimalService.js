

import Animal from '../models/Animals.js';

class AnimalService{
    constructor() {}

        async retrieveAnimal(animalId) {
            return Animal.findOne({ _id: animalId });
        }

        //! I added this one, i know its not a requirement but i just wanted to add it.
        async retrieveAllAnimals() {
            return await Animal.find();
        }

        // ! originally I have the animals model stuff in here and it wasnt working. 
        // When you look at mongoose it shows the objects as 'data' and 'data' is the object that is being passed in.
        async createAnimal(data) {
            return Animal.create(data);
        }
        // Looked up the new: true and it returns the updated document instead of the original.
        async updateAnimal(animalId, data) {
            return Animal.findOneAndUpdate({ _id: animalId }, data, { new: true });
        }

        async deleteAnimal(animalId) {
            return Animal.findOneAndDelete({ _id: animalId });
        }
    }

export default new AnimalService();
