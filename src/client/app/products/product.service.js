/*
Name: Alyssa Bhagwandin
Filename: product.service.js
Course: INFT 2202
Created Date: February 13th, 2025
Description: This is my product.service.js file that interacts with the Course API.
*/

import Product from "./product.js";

class ProductService {
    constructor() {
        this.apikey = '24825d3a-0291-4360-957a-425ccdea8b68';
        this.host = 'http://localhost:3000';
    }

    /**
     * Fetches a paginated list of products from the Course API.
     * @param {number} page - The current page number (default is 1).
     * @param {number} perPage - The number of products per page (default is 5).
     * @returns {Promise<Array<Product>>} A list of product objects.
     */
    async getProducts(page = 1, perPage = 5) {
        const url = new URL(`/api/products`, this.host);
        url.search = new URLSearchParams({ page, perPage });

        const headers = new Headers({
            "apikey": this.apikey,
            "Content-Type": "application/json",
        });

        const options = {
            method: "GET",
            headers
        };

        // Create a new Request object with the API URL and options.
        const request = new Request(url, options);

        try {

            // Perform the API request and wait for the response
            const response = await fetch(request);

            // If the response is not OK (404, 500), throw an error with details
            if (!response.ok) {
                throw new Error(`Error fetching products: ${response.statusText}`);
            }
            const { records } = await response.json();
            console.log("API Response from getAllProducts():", records);

            // Check if the response contains a "records" field and if it's an array.
            if (!records || !Array.isArray(records)) {
                throw new Error("Invalid API response: expected an array in records.records");
            }

            // Convert each raw product object into an instance of the Product class
            return records.map(product => new Product(product));

        } catch (err) {
            // Log any errors encountered during the request
            // console.error("Error fetching products:", err);
            // Return an empty array to prevent crashes if the API call fails
            return [];
        }
    }

    /**
     * Fetches all products (for non-paginated use cases).
     * @returns {Promise<Array<Product>>} A full list of product objects.
     */
    async getAllProducts() {
        return this.getProducts(1, 1000);
    }

    /**
     * Fetches a single product by ID.
     * @param {string} productId - The product ID.
     * @returns {Promise<Product>} The found product.
     */
    async findProduct(_id) {
        const url = new URL(`/api/products/${_id}`, this.host);

        const headers = new Headers({
            "apikey": this.apikey,
            "Content-Type": "application/json",
        });

        const options = {
            method: "GET",
            headers
        };

        const request = new Request(url, options);

        try {
            const response = await fetch(request)
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Product not found: ${response.status} - ${errorText}`);
                return null;
            }

            const responseData = await response.json();
            console.log("API Response from findProduct():", responseData);

            const foundProduct = new Product(responseData);

            if (!foundProduct) {
                throw new Error('Error: That product does not exist.');
            }

            return foundProduct;
        } catch (err) {
            console.error('Error finding product:', err.message);
            return null;
        }
    }

    /**
     * Creates a new product via the API.
     * @param {Product} productObject - The product records.
     * @returns {Promise<boolean>} True if successful.
     */
    async createProduct(productObject) {

        console.log("Creating product:", productObject);
        const url = new URL('/api/products', this.host);
        const headers = new Headers({
            'content-type': 'application/json',
            'apikey': this.apikey
        });

        const options = {
            headers,
            method: 'POST',
            body: JSON.stringify(productObject)
        };

        const request = new Request(url, options);

        try {
            const response = await fetch(request);
            if (!response.ok) throw new Error(`Error creating product: ${response.statusText}`);

            const records = await response.json();
            console.log(records);
            return true;
        } catch (err) {
            console.error('Error creating product:', err);
            throw err;
        }
    }

    /**
     * Updates an existing product.
     * @param {Product} updateProduct - The updated product records.
     * @returns {Promise<boolean>} True if successful.
     */
    async updateProduct(updateProduct) {
        const url = new URL(`/api/products/${updateProduct._id}`, this.host);

        const headers = new Headers({
            "apikey": this.apikey,
            "Content-Type": "application/json",
        });

        const options = {
            method: "PUT",
            headers,
            body: JSON.stringify(updateProduct)
        };

        const request = new Request(url, options);

        try {
            const response = await fetch(request);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error updating product: ${response.statusText} - ${errorText}`);
            }

            const records = await response.json();
            console.log("API Response from updateProduct():", records);
            return true;
        } catch (err) {
            console.error("Error updating product:", err);
            throw err;
        }
    }

    /**
     * Deletes a product by ID.
     * @param {string} productId - The product ID.
     * @returns {Promise<boolean>} True if successful.
     */
    async deleteProduct(productId) {
        console.log(`Deleting product with ID: ${productId}`);
        const url = new URL(`/api/products/${productId}`, this.host);
        console.log(`Request URL: ${url}`);

        const headers = new Headers({
            "apikey": this.apikey,
            "Content-Type": "application/json",
        });

        const options = {
            method: "DELETE",
            headers
        };

        const request = new Request(url, options);
        
        try {
            const response = await fetch(request);

            if (!response.ok) {
                throw new Error(`Error deleting product: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(`Product deleted: ${result.message}`);
            return true;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }


    /**
     * Waits for a specified amount of time.
     * @param {number} time - The time to wait in milliseconds.
     * @returns {Promise<void>} A promise that resolves after the specified time.
     */
    waitTho(time) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, time);
        });
    }
}

// Export an instance of ProductService
export default new ProductService();