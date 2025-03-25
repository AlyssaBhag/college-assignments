import { checkSchema } from 'express-validator';
import AnimalService from "../../services/AnimalService.js";
import { isValidObjectId } from 'mongoose';

const rules = checkSchema({
    animalId: {
        notEmpty: {
            errorMessage: 'Animal ID is required',
        },
        custom: {
            options: async (value) => {
                if (!isValidObjectId (value)) {
                    throw new Error('Invalid ID');
                }
                if (!await AnimalService.retrieveAnimal(value)) {
                    throw new Error('animal doesnt exist');
                }
            },
        },
        in : 'params',
    }
});

const handle = async (req, res, next) => {
    try {
        const { animalId } = req.params;
        console.log(`Handling request to retrieve animal with ID: ${animalId}`);
        const animal = await AnimalService.retrieveAnimal(animalId);
        if (!animal) {
            console.log(`Animal not found with ID: ${animalId}`);
            return res.status(404).json({ message: 'Animal not found' });
        }
        console.log(`Animal found: ${animal.name}`);
        res.json(animal);
    } catch (error) {
        console.error(`Error retrieving animal: ${error.message}`);
        next(error);
    }
};

export default { handle, rules };