import { checkSchema } from 'express-validator';
import ProductService from '../../services/ProductService.js';

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
    try {
        const { page, perPage } = req.query;
        const body = await ProductService.searchProduct(page, perPage);

        console.log('Response body:', body); // Log the response body
        res.json(body);
    } catch (error) {
        console.error(error.message); // Log the error message
        next(error);
    }
};

export default { handle, rules };