import { checkSchema } from 'express-validator';
import ProductService from "../../services/ProductService.js";


const rules = checkSchema({
    productId: {
            errorMessage: 'Invalid product ID',
        },
            custom: {
                options: async (value) =>{
                if (!isValidObjectId (value)) {
                    throw new Error('Invalid ID');
                }
                if (!await AnimalService.deleteProduct(value)) {
                    throw new Error('That product does not exists');
                }
            },
        in: 'params',
        }
});

const handle = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await ProductService.deleteProduct(productId);
        res.json(`${product.name} has been deleted :( `);

    } catch (error) {
        next(error);
    }
};

export default { handle, rules };