import { checkSchema } from 'express-validator';
import ProductService from "../../services/ProductService.js";

const rules = checkSchema({
    productId: {
        notEmpty: {
            errorMessage: 'Product ID is required',
        },
        in: 'params',
    },
    name: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Name is required',
        },
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
    },
});

const handle = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { name, price, stock, description } = req.body;

        const product = await ProductService.updateProduct(productId, { name, price, stock, description });
        res.json(product);
        
    } catch (error) {
        next(error);
    }
};

export default { handle, rules };