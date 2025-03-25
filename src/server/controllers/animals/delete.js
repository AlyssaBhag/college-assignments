import { checkSchema } from 'express-validator';
import AnimalService from "../../services/AnimalService.js";

const rules = checkSchema({
    animalId: {
        in: ['params'],
            errorMessage: 'Invalid animal ID',
        },
});


const handle = async (req, res, next) => {
    try {
        const { animalId } = req.params;
        const animal = await AnimalService.deleteAnimal(animalId);
        res.json(`${animal} has been deleted :( `);

    } catch (error) {
        next(error);
    }
};

export default { handle, rules }