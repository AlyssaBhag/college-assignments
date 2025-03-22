import { model, Schema } from "mongoose";

const fields = {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
        default: "Alyssa"
    },
    createdDate: {
        type: Date, 
        default: Date.now }
};

const options = {
    timestamps: true
};

const ProductSchema = new Schema(fields, options);
const Product = model('Product', ProductSchema);

export default Product;