import Animal from '../models/animal.js';

class AnimalService{
    constructor() {}

        async retrieveAnimal(animalId) {
            const animal = await Animal.findById(animalId);
            return animal;
        }
    
        async retrieveAnimalName(name) {
            const namedAnimal = await Animal.find({name});
            if(namedAnimal && namedAnimal.length > 0)
                {
                    return true;
                } 
            return false;
        }

        // originally I have the animals model stuff in here and it wasnt working. 
        // When you look at mongoose it shows the objects as 'data' and 'data' is the object that is being passed in.
        async createAnimal({ name, breed, legs, eyes, sound }) {
            const animal = await Animal.create({ name, breed, legs, eyes, sound });
            return animal;
        }
        // Looked up the new: true and it returns the updated document instead of the original.
        async updateAnimal(animalId, { name, breed, legs, eyes, sound }) {   
        const filter = {_id: animalId};
        const update = { name, breed, legs, eyes, sound };
        const animal = await Animal.findOneAndUpdate(filter, update, {new: true});
        return animal;
        }

        async deleteAnimal(animalId) {
            const filter = {_id: animalId};
            const animal = await Animal.findOneAndDelete(filter);
            return animal;
        }

        async searchAnimal(page = 1 , perPage = 3) {
            const filters = {};
            const count = await Animal.countDocuments(filters);
            const pages = Math.ceil(count / perPage);
            
            const pagination = {
                page: parseInt(page), 
                perPage: parseInt(perPage),
                count, 
                pages
            };

            const fields = {
                __v: 0
            }

            const options = {
                skip: (page - 1) * perPage,
                limit: perPage,
                sort: { createdAt: -1 }
            };

            const records =  await Animal.find(filters, fields, options);
            return {records, pagination}
        }
    }

export default new AnimalService();
