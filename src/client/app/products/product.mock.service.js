/*
Name: Alyssa Bhagwandin
Filename: product.mock.service.js
Course: INFT 2202
Created Date: January 31th, 2025
Description: This is my product.mock.service.js file
*/

import Product from "./product.js";


class ProductService {
    constructor() {
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify([]));
        }
    }

    getProducts(page = 1, perPage = 5) {
        const first = (page - 1) * perPage;
        const last = first + perPage;
        
        const products = JSON.parse(localStorage.getItem('products'))
            .map(productObject => new Product(productObject))
            .slice(first, last);
        
        return products;
    }

    getAllProducts() {
        return JSON.parse(localStorage.getItem('products'))
            .map(productObject => new Product(productObject));
    }

    getProductsCount() {
        return JSON.parse(localStorage.getItem('products')).length;
    }

    findProduct(id) {
        const products = this.getAllProducts();
        return products.find(p => p.id === id);
    }

    createProduct(productObject) {
        const products = this.getAllProducts();
        if (products.find(p => p.name === productObject.name)) {
            throw new Error("This product name already exists! Please try again with another one.");
        }
        products.push(productObject);
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }

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

// Export an instance of ProductService
export default new ProductService();
