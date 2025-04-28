/*
Name: Alyssa Bhagwandin
Filename: Product.js
Course: INFT 2202
Created Date: January 31th, 2025
Description: This is my Product.js file
*/

// Constructor function for creating a Product object.
function Product({_id = null, name, price, stock, description, owner = null , createdDate = new Date().toISOString() }) {
    // Assign a unique ID if not provided.
    this._id = _id || crypto.randomUUID();
    // Assign provided properties to the object.
    Object.assign(this, {name, price, stock, description, owner, createdDate});
}

// Export the Product constructor for use in other modules.
export default Product;

// Method to return a string representation of the product.
Product.prototype.toString =  async function() {
    return `${this.name}: $${this.price.toFixed(2)}, ${this.stock} in stock`;
};

// Method to convert the product object to a JSON-friendly format.
Product.prototype.toJSON = function() {
    return {
        _id: this._id,
        name: this.name,
        price: this.price,
        stock: this.stock,
        description: this.description,
        owner: this.owner,
        createdDate: this.createdDate
    };
};
