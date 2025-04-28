import { checkSchema } from 'express-validator';
import ProductService from '../../services/ProductService.js';

const rules = checkSchema({
    name: {
        notEmpty: { 
            errorMessage: 'Name field cannot be empty.'
        },
        custom: {
            options: async (value) => {
                if (await ProductService.retrieveProductName(value)) {
                    throw new Error('Product with that name already exists.');
                }
            }
        },
        in: 'body'
    },
    price: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please enter the price',
        },
        isNumeric: {
            errorMessage: 'Price must be a number',
        },
    },
    stock: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please enter the stock quantity',
        },
        isNumeric: {
            errorMessage: 'Stock must be a number',
        },
    },
    description: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please enter the description',
        },
    }
    // owner: {
    //     in: ['body'],
    //     notEmpty: {
    //         errorMessage: 'Please enter the owner',
    //     },
    // },
});

const handle = async (req, res, next) => {
    try {
        // Log the request body.
        console.log('Request body:', req.body); 
        const { name, price, stock, description } = req.body;
        const product = await ProductService.createProduct({ name, price, stock, description });
        res.status(201).json(product); 
    } catch (error) {
        console.error('Error creating product:', error.message);
        next(error);
    }
};

export default { handle, rules };