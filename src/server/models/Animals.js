import { model, Schema } from "mongoose";

const fields = {
    _id: {
        type: String,
        required: true,
        default: () => crypto.randomUUID()
    },
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    legs: {
        type: Number,
        required: true
    },
    eyes: {
        type: Number,
        required: true
    },
    sound: {
        type: String,
        required: true  
    },
};

const options = {
    timestamps: true
}

const AnimalSchema = new Schema(fields, options);
const Animal = model('Animal', AnimalSchema);

export default Animal;