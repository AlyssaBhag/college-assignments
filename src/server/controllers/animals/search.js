import AnimalService from '../../services/AnimalService.js';

const handle = async (req, res, next) => {
    try{

        const {page, perPage} = req.query;
        const body = await AnimalService.searchAnimal(page, perPage);
        res.json(body);
    }
    catch(error){
        next(error);
    }
}

export default { handle }