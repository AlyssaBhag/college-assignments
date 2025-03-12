

import Animal from '../models/Animals.js';

class AnimalService{
    constructor() {}


        async retrieveAnimal(animalId) {
            return Animal.findOne({ _id: animalId });
        }

        // originally I have the animals model stuff in here and it wasnt working. 
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
