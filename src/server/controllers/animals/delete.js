import AnimalService from "../../services/AnimalService.js";

const handle = async (req, res, next) => {
    try {
        const { animalId } = req.params;
        const animal = await AnimalService.deleteAnimal(animalId);
        res.json('Animal has been deleted :( ');

    } catch (error) {
        next(error);
    }
};

export default { handle }