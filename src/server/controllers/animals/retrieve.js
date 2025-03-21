import { checkSchema } from 'express-validator';
import AnimalService from "../../services/AnimalService.js";

const rules = checkSchema({
    animalId: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'Animal ID is required',
        },
        custom: {
            options: async (value) => {
                if (!await AnimalService.retrieveAnimal(value)) {
                    throw new Error('Invalid animal ID');
                }
            },
        }
    }
});

const handle = async (req, res, next) => {
    try {
        const { animalId } = req.params;
        const animal = await AnimalService.retrieveAnimal(animalId);
        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        res.json(animal);
    } catch (error) {
        next(error);
    }
};

export default { handle, rules };