import { checkSchema } from 'express-validator';
import ProductService from "../../services/ProductService.js";
import { isValidObjectId } from 'mongoose';

const rules = checkSchema({
    productId: {
        notEmpty: {
            errorMessage: 'Product ID is required',
        },
        custom: {
            options: async (value) => {
                if (!isValidObjectId(value)) {
                    throw new Error('Invalid ID');
                }
                if (!await ProductService.retrieveProduct(value)) {
                    throw new Error('Product does not exist');
                }
            },
        },
        in: 'params',
    }
});

const handle = async (req, res, next) => {
    try {
        const { productId } = req.params;
        console.log(`Handling request to retrieve product with ID: ${productId}`);
        const product = await ProductService.retrieveProduct(productId);
        if (!product) {
            console.log(`Product not found with ID: ${productId}`);
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log(`Product found: ${product.name}`);
        res.json(product);
    } catch (error) {
        console.error(`Error retrieving product: ${error.message}`);
        next(error);
    }
};

export default { handle, rules };