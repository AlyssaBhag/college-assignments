import { checkSchema } from 'express-validator';
import AnimalService from "../../services/AnimalService.js";

const rules = checkSchema({
    animalId: {
        in: ['params'],
        isMongoId: {
            errorMessage: 'Invalid animal ID',
        },
    },
});

const handle = async (req, res, next) => {
    try {
        const { animalId } = req.params;
        const animal = await AnimalService.retrieveAnimal(animalId);
        res.json(animal);

    } catch (error) {
        next(error);
    }
};

export default { handle, rules }