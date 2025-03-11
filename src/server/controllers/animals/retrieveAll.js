import AnimalService from '../../services/AnimalService.js';

const handle = async (req, res, next) => {
    try {
        const animals = await AnimalService.retrieveAllAnimals();
        res.json(animals);
    } catch (error) {
        next(error);
    }
};

export default { handle };