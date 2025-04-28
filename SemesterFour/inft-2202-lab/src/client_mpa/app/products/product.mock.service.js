/*
Name: Alyssa Bhagwandin
Filename: product.mock.service.js
Course: INFT 2202
Created Date: January 31th, 2025
Description: This is my product.mock.service.js file
*/

// Import the Product class
import Product from "./product.js";

// Made these all into classes and not prototypes like the In classes.
class ProductService {
    constructor() {
        // Check if 'products' exists in localStorage; if not, initialize it as an empty array
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify([]));
        }
    }


    /**
     * Retrieves a paginated list of products from localStorage.
     * @param {number} page - The current page number (default is 1).
     * @param {number} perPage - The number of products per page (default is 5).
     * @returns {Array<Product>} A paginated list of Product objects.
     */
    getProducts(page = 1, perPage = 5) {
        const first = (page - 1) * perPage;
        const last = first + perPage;
        
        const products = JSON.parse(localStorage.getItem('products'))
            .map(productObject => new Product(productObject))
            .slice(first, last);
        
        return products;
    }


    /**
     * Retrieves all products stored in localStorage.
     * @returns {Array<Product>} A list of all Product objects.
     */
    getAllProducts() {
        return JSON.parse(localStorage.getItem('products'))
            .map(productObject => new Product(productObject));
    }


    /**
     * Returns the total number of products stored in localStorage.
     * @returns {number} The total count of products.
     */
    getProductsCount() {
        return JSON.parse(localStorage.getItem('products')).length;
    }


    /**
     * Finds a product by its ID.
     * @param {string} id - The unique identifier of the product.
     * @returns {Product|null} The found product or null if not found.
     */
    findProduct(id) {
        const products = this.getAllProducts();
        return products.find(p => p.id === id);
    }


    /**
     * Adds a new product to localStorage.
     * @param {Product} productObject - The product to be added.
     * @throws {Error} If a product with the same name already exists.
     * @returns {boolean} True if the product is successfully added.
     */
    createProduct(productObject) {
        const products = this.getAllProducts();
        if (products.find(p => p.name === productObject.name)) {
            throw new Error("This product name already exists! Please try again with another one.");
        }
        products.push(productObject);
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }


    /**
     * Updates an existing product in localStorage.
     * @param {Product} updateProduct - The updated product object.
     * @throws {Error} If the product is not found.
     * @returns {boolean} True if the update was successful.
     */
    updateProduct(updateProduct) {
        const products = this.getAllProducts();
        const index = products.findIndex(p => p.id === updateProduct.id);

        if (index === -1) {
            throw new Error("Product not found. Cannot update.");
        }
        products[index] = updateProduct;
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }


    /**
     * Deletes a product from localStorage by its ID.
     * @param {string} id - The ID of the product to delete.
     * @throws {Error} If the product does not exist.
     * @returns {boolean} True if the deletion was successful.
     */
    deleteProduct(id) {
        const products = this.getAllProducts();
        const index = products.findIndex(p => p.id === id);
        
        if (index === -1) {
            throw new Error("That product doesn't exist. Please try again.");
        }
        
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }
}

// Export an instance of ProductService.
export default new ProductService();
