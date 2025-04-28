import { checkSchema } from 'express-validator';
import AnimalService from '../../services/AnimalService.js';

const rules = checkSchema({
    name: {
        notEmpty:{ 
            errorMessage: `Name field cannot be empty.`
        },
        custom: {
                    options: async(value) => {
                        if(await AnimalService.retrieveAnimalName(value)) {
                            throw new Error(`Animal with that name already exists.`);
                        }
                    }
                },
        in: 'body'
    },
    breed: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please enter the breed',
        },
        isNumeric: {
            negated: true,
            errorMessage: 'Breed must not be a number',
        },
    },
    eyes: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please enter the number of eyes',
        },
        isNumeric: {
            errorMessage: 'Eyes must be a number',
        },
    },
    legs: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Please enter the number of legs',
        },
        isNumeric: {
            errorMessage: 'Legs must be a number',
        },
    },
    sound: {
        in: ['body'],
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
        const animal = await AnimalService.createAnimal({ name, breed, eyes, legs, sound });
        res.json(animal);
    } catch (error) {
        next(error);
    }
};

export default { handle, rules };