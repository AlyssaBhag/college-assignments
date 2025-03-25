import { checkSchema } from 'express-validator';
import AnimalService from '../../services/AnimalService.js';

const rules = checkSchema({
    name: {
        notEmpty: {
            errorMessage: 'Name is required',
        },
        in: ['body'],
    },
    breed: {
        notEmpty: {
            errorMessage: 'Please enter the breed',
        },
        isNumeric: {
            negated: true,
            errorMessage: 'Breed must not be a number',
        },
    },
    eyes: {
        notEmpty: {
            errorMessage: 'Please enter the number of eyes',
        },
        isNumeric: {
            errorMessage: 'Eyes must be a number',
        },
    },
    legs: {
        notEmpty: {
            errorMessage: 'Please enter the number of legs',
        },
        isNumeric: {
            errorMessage: 'Legs must be a number',
        },
    },
    sound: {
        notEmpty: {
            errorMessage: 'Please enter the sound',
        },
        isNumeric: {
            negated: true,
            errorMessage: 'Sound must not be a number',
        },
    },
});


const handle = async (req, res, next) => {
    try {
        const { name, breed, eyes, legs, sound } = req.body;
        const animal = await AnimalService.createAnimal({ name, breed, eyes, legs, sound});
        // const animal = await AnimalService.createAnimal(req.body);
        res.json(animal);

    } catch (error) {
        next(error);
    }
};

export default { handle, rules};