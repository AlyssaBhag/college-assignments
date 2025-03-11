
import AnimalService from '../../services/AnimalService.js';


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

export default { handle };