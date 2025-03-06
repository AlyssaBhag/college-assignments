/*
Name: Alyssa Bhagwandin
Filename: routes.js
Course: INFT 2202
Created Date: March 5th, 2025
Description: This is my animals router file.
*/


import express from 'express';
const router = express.Router();
export default router;

// Get all animals. "Search" for animals.
router.get('/animals', (req, res) => {
    res.json({ message: 'Getting all of the animals' });
});

// Get a specific animal by ID. "Retrieve" an animal
router.get('/animals/:animalId', (req, res) => {
    res.json({ 
        message: `Getting animal with specific ID of: ${req.params.animalId}`
    });
});

// "Create" an animal.
router.post('/animals', (req, res) => {
    res.json({ 
        message: 'This is the create animal page!',

    });
});

// "Update" an animal by ID. 
router.put('/animals/:animalId', (req, res) => {
    console.log(req.params);
    res.json({
        message: `This is the animal with ID ${req.params.animalId}`
    });
});

// "Delete" an animal by ID.
router.delete('/animals/:animalId', (req, res) => {
    res.json({ 
        message: `Animal with ID ${req.params.animalId} deleted`,
    });
});
