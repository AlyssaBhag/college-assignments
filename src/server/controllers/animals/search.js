import { checkSchema } from 'express-validator';
import AnimalService from '../../services/AnimalService.js';

const rules = checkSchema({
    page: {
        in: ['query'],
        isInt: {
            options: { min: 1 },
            errorMessage: 'Page must be a positive integer',
        },
    },
    perPage: {
        in: ['query'],
        isInt: {
            options: { min: 1 },
            errorMessage: 'PerPage must be a positive integer',
        },
    },
});


const handle = async (req, res, next) => {
    try{
        const {page, perPage} = req.query;
        const body = await AnimalService.searchAnimal(page, perPage);
        res.json(body);
    } catch(error){
        next(error);
    }
}

export default { handle, rules }