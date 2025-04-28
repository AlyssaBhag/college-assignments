import { checkSchema } from 'express-validator';
import AnimalService from "../../services/AnimalService.js";

const rules = checkSchema({
    animalId: {
            errorMessage: 'Invalid animal ID',
        },
            custom: {
                options: async (value) =>{
                if (!isValidObjectId (value)) {
                    throw new Error('Invalid ID');
                }
                if (!await AnimalService.deleteAnimal(value)) {
                    throw new Error('That animal does not exists');
                }
            },
        in: 'params',
        }
});


const handle = async (req, res, next) => {
    try {
        const { animalId } = req.params;
        const animal = await AnimalService.deleteAnimal(animalId);
        res.json(`${animal.name} has been deleted :( `);

    } catch (error) {
        next(error);
    }
};

export default { handle, rules }