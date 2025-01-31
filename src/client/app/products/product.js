/*
Name: Alyssa Bhagwandin
Filename: Product.js
Course: INFT 2202
Created Date: January 31th, 2025
Description: This is my Product.js file
*/

function Product({id = null, name, price, stock, description}) {
    this.id = id || crypto.randomUUID();
    Object.assign(this, {name, price, stock, description});
}
export default Product;


Product.prototype.toString = function() {
    return `${this.name}: $${this.price.toFixed(2)}, ${this.stock} in stock`;
};

Product.prototype.toJSON = function() {
    return {
        id: this.id,
        name: this.name,
        price: this.price,
        stock: this.stock,
        description: this.description
    };
};
