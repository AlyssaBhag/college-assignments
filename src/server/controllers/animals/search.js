import { checkSchema } from 'express-validator';
import AnimalService from '../../services/AnimalService.js';

const rules = checkSchema({
    page: {
        in: ['query'],
        isInt: {
            options: { min: 1 },
            errorMessage: 'Page must be a positive integer',
        },
        toInt: true,
        optional: { options: { nullable: true } },
        default: 1
    },
    perPage: {
        in: ['query'],
        isInt: {
            options: { min: 1 },
            errorMessage: 'PerPage must be a positive integer',
        },
        toInt: true,
        optional: { options: { nullable: true } },
        default: 5
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