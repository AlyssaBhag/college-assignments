/*
Name: Alyssa Bhagwandin
Filename: routes.js
Course: INFT 2202
Created Date: March 5th, 2025
Description: This is my animals router file.
*/

// import the Animal model.
import Animal from '../../client/app/models/animal.js';  
// import Animal from '../../models/Animal.js';
import express from 'express';
// import the controllers for the animals.
import AnimalCreateController from '../controllers/animals/create.js';
import AnimalRetrieveController from '../controllers/animals/retrieve.js';
import AnimalUpdateController from '../controllers/animals/update.js';
import AnimalDeleteController from '../controllers/animals/delete.js';
import AnimalSearchController from '../controllers/animals/search.js';
import { CheckValidation } from '../middleware/validation.js';

const router = express.Router();
export default router;

// Retrieve all animals.
router.get('/animals/', 
        CheckValidation(AnimalSearchController.rules),  
        AnimalSearchController.handle);


// Retrieve an animal by ID.
router.get('/animals/:animalId', 
    CheckValidation(AnimalRetrieveController.rules),  
    AnimalRetrieveController.handle);


// create animal
router.post(
    '/animals',
    CheckValidation(AnimalCreateController.rules), 
    AnimalCreateController.handle
);
    
// update animal
router.put('/animals/:animalId', 
    CheckValidation(AnimalUpdateController.rules), 
    AnimalUpdateController.handle);

// Delete an animal by ID
router.delete('/animals/:animalId', 
    CheckValidation(AnimalDeleteController.rules), 
    AnimalDeleteController.handle);

