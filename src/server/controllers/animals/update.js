import AnimalService from "../../services/AnimalService.js";

const handle = async (req, res, next) => {
    try {
        const { animalId } = req.params;
        const animal = await AnimalService.updateAnimal(req.params.animalId, req.body);
        res.json(animal);

    } catch (error) {
        next(error);
    }
};

export default { handle }

