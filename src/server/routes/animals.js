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

const router = express.Router();

//  "Retrieve" all animal that i added it is not a requirement.
router.get('/animals/search', AnimalSearchController.handle);

// "Retrieve" an animal by ID.
router.get('/animals/:animalId', AnimalRetrieveController.handle);

//  "Create" an animal.
router.post('/animals', AnimalCreateController.handle);

//  "Update" an animal by ID.
router.put('/animals/:animalId', AnimalUpdateController.handle);

// "Delete" an animal by ID.
router.delete('/animals/:animalId', AnimalDeleteController.handle);

export default router;