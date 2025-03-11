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
import AnimalRetrieveAllController from '../controllers/animals/retrieveAll.js';
import AnimalUpdateController from '../controllers/animals/update.js';
import AnimalDeleteController from '../controllers/animals/delete.js';


const router = express.Router();



// ! New "Retrieve" all animal that i added it is not a requirement.
router.get('/animals', AnimalRetrieveAllController.handle);

// // Get all animals. "Search" for animals.
// router.get('/animals', (req, res, next) => {
//     res.json({ message: 'Getting all of the animals' });
// });

// ! New "Retrieve" an animal by ID.
router.get('/animals/:animalId', AnimalRetrieveController.handle);

// // Get a specific animal by ID. "Retrieve" an animal
// router.get('/animals/:animalId', (req, res, next) => {
//     res.json({ 
//         message: `Getting animal with specific ID of: ${req.params.animalId}`
//     });
// });

// ! New "Create" an animal.
router.post('/animals', AnimalCreateController.handle);
// router.post('/animals', async (req, res, next) => {
//     try {
//         const { name, breed, eyes, legs, sound } = req.body;
//         const animal = await Animal.create({ name: name, breed: breed, eyes: eyes, legs: legs, sound: sound});
//         // console.log(body);
//         res.json(animal);

//     } catch (error) {
//         next(error);
//     }
// });

// ! New "Update" an animal by ID.
router.put('/animals/:animalId', AnimalUpdateController.handle);
// // "Update" an animal by ID. 
// router.put('/animals/:animalId', (req, res, next) => {
//     console.log(req.params);
//     res.json({
//         message: `This is the animal with ID ${req.params.animalId}`
//     });
// });

// ! New "Delete" an animal by ID.
router.delete('/animals/:animalId', AnimalDeleteController.handle);
// // "Delete" an animal by ID.
// router.delete('/animals/:animalId', (req, res, next) => {
//     res.json({ 
//         message: `Animal with ID ${req.params.animalId} deleted`,
//     });
// });

export default router;