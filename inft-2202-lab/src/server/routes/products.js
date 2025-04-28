/*
Name: Alyssa Bhagwandin
Filename: products.js
Course: INFT 2202
Created Date: March 5th, 2025
Description: This is my products router file.
*/

import express from 'express';
import ProductCreateController from '../controllers/products/create.js';
import ProductRetrieveController from '../controllers/products/retrieve.js';
import ProductUpdateController from '../controllers/products/update.js';
import ProductDeleteController from '../controllers/products/delete.js';
import ProductSearchController from '../controllers/products/search.js';
import { CheckValidation } from '../middleware/validation.js';

const router = express.Router();

// "Retrieve" all products
router.get('/products',
    CheckValidation(ProductSearchController.rules),
    ProductSearchController.handle
);

// "Retrieve" all products (alternative route)
router.get(
    '/',
    CheckValidation(ProductSearchController.rules),
    ProductSearchController.handle
);

// "Retrieve" a product by ID
router.get('/:productId',
    CheckValidation(ProductRetrieveController.rules),
    ProductRetrieveController.handle
);

// "Create" a product
router.post('/create',
    CheckValidation(ProductCreateController.rules),
    ProductCreateController.handle
);

// "Create" a product (alternative route)
router.post('/',
    CheckValidation(ProductCreateController.rules),
    ProductCreateController.handle
);

// "Update" a product by ID
router.put('/:productId',
    CheckValidation(ProductUpdateController.rules),
    ProductUpdateController.handle
);

// "Delete" a product by ID
router.delete('/:productId',
    CheckValidation(ProductDeleteController.rules),
    ProductDeleteController.handle
);

export default router;
