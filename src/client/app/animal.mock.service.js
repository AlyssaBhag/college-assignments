
import Animal from "./animals/animal.js";

// Function gets hosited, put here for visibility
export default new AnimalService()

// service constructor.
function AnimalService() {
    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

AnimalService.prototype.listAnimals = function () {
    const animals = JSON.parse(localStorage.getItem('animals'))
        .map(animalObject => new Animal(animalObject));
    return animals;
}

// AnimalService.prototype.listAnimals = function() {
//     return this.getAnimals();
// }

//find
AnimalService.prototype.findIndex = function(id){
    const animals = this.listAnimals();
    const index = animals.findIndex((a) = a.id === id);
    if(!animals) {
        throw new Error("That animal doesnt exist! Please try again with a valid animal.")
    }
    return index;
}

//create
AnimalService.prototype.createAnimal = function(animalObject){
    const animals = this.listAnimals();
    if (animals.find(a => a.name === animalObject.name)) {
        throw new Error("This animals already exist! Please try again with another one.");
    }
// took out the JSON() function from here. 
    animals.push(animalObject);
    localStorage.setItem('animals', JSON.stringify (animals));

    return true;
}

//update
AnimalService.prototype.updateAnimal = function(animalModel) {
    const animals = this.listAnimals();
    const index = animals.findIndex(animalModel.id);

    animals[index] = animalModel.toObject();
    localStorage.setItem('animals', JSON.stringify(animals));
    
    return true;

}

//delete
//https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
AnimalService.prototype.deleteAnimal = function(animalModel){
    const animals = this.listAnimals();
    const index = animals.findIndex(animalModel.id);

    if (index === -1) {
        throw new Error("That animal doesn't exist. Please try again.");
    }
    
    animals.splice(index, 1);
    localStorage.setItem('animals', JSON.stringify(animals));
    
    return true
}
