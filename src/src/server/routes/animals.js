/*
Name: Alyssa Bhagwandin
Filename: routes.js
Course: INFT 2202
Created Date: March 5th, 2025
Description: This is my animals router file.
*/

// import the Animal model.
// import Animal from '../models/Animals.js';  
import express from 'express';
// import the controllers for the animals.
import AnimalCreateController from '../controllers/animals/create.js';
import AnimalRetrieveController from '../controllers/animals/retrieve.js';
import AnimalUpdateController from '../controllers/animals/update.js';
import AnimalDeleteController from '../controllers/animals/delete.js';
import AnimalSearchController from '../controllers/animals/search.js';
import { CheckValidation } from '../middleware/validation.js';

const router = express.Router();

// Retrieve all animals.
router.get('/animals/search',
    AnimalSearchController.rules,
    (req, res, next) => {
    CheckValidation(AnimalSearchController.rules),
    next();
    },
    AnimalSearchController.handle
);

// Retrieve an animal by ID.
router.get('/animals/:animalId',
    AnimalRetrieveController.rules,
    (req, res, next) => {
    CheckValidation(AnimalRetrieveController.rules),
    next();
    },
    AnimalRetrieveController.handle
);


//  "Create" an animal.
router.post('/animals',
    AnimalCreateController.rules,
    (req, res, next) => {
    CheckValidation(AnimalCreateController.rules);
    next();
    },
    AnimalCreateController.handle
);


// Update an animal by ID
router.put('/animals/:animalId',
    AnimalUpdateController.rules,
    (req, res, next) => {
    CheckValidation(AnimalUpdateController.rules),
    next();
    },
    AnimalUpdateController.handle
);

// Delete an animal by ID
router.delete('/animals/:animalId',
    AnimalDeleteController.rules,
    (req, res, next) => {
    CheckValidation(AnimalDeleteController.rules),
    next();
    },
    AnimalDeleteController.handle
);

export default router;