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
        this.host = 'https://inft2202.opentech.durhamcollege.org';
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
        })
        
        
        const options = {
            method: "GET",
            headers
        };

        try{
            // Create a new Request object with the API URL and options.
            const request = new Request(url, options);
            // Perform the API request and wait for the response
            const response = await fetch (request);
    
            // If the response is not OK (404, 500), throw an error with details
            if (!response.ok) {
                throw new Error(`Error fetching products: ${response.statusText}`);
            }

            const data = await response.json(); 
            console.log("API Response from getAllProducts():", data);
    
            // Check if the response contains a "records" field and if it's an array.
            if (!data.records || !Array.isArray(data.records)) {
                throw new Error("Invalid API response: expected an array in data.records");
            }
    
            // Convert each raw product object into an instance of the Animal class
            // return data.records.map(product => new Product(product));
            return data.records.map(product => new Product({ ...product, productId: product.productId }));

    
        }catch (err) {
            // Log any errors encountered during the request
            console.error("Error fetching products:", err);
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
    async findProduct(id) {
        const url = new URL(`/api/products/${id}`,this.host);

        const headers = new Headers({
            "apikey": this.apikey,
            "Content-Type": "application/json",
        })

        const options = {
            method: "GET",
            headers
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Product not found: ${response.statusText}`);

            return new Product(await response.json());
        } catch (err) {
            console.error("Error finding product:", err);
            throw err;
        }
    }

    /**
     * Creates a new product via the API.
     * @param {Product} productObject - The product data.
     * @returns {Promise<boolean>} True if successful.
     */
    async createProduct(productObject) {
        const url = new URL(`/api/products`, this.host);


        const headers = new Headers({
            "apikey": this.apikey,
            "Content-Type": "application/json",
        })

        const options = {
            method: "POST",
            headers,
            body: JSON.stringify(productObject)
        };

        try {
            const response = await fetch(url, options)
            if (!response.ok) throw new Error(`Error creating product: ${response.statusText}`);

            return true;
        } catch (err) {
            console.error("Error creating product:", err);
            throw err;
        }
    }

    /**
     * Updates an existing product.
     * @param {Product} updateProduct - The updated product data.
     * @returns {Promise<boolean>} True if successful.
     */
    async updateProduct(updateProduct) {
        const url = new URL(`api/products/${updateProduct.id}`, this.host);
        

        const headers = new Headers({
            "apikey": this.apikey,
            "Content-Type": "application/json",
        })

        const options = {
            method: "PUT",
            headers,
            body: JSON.stringify(updateProduct)
        };

        try {
            const response = await fetch(url, options)


            if (!response.ok) throw new Error(`Error updating product: ${response.statusText}`);

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
    async deleteProduct(id) {
        console.log(`Deleting product with ID: ${id}`);
        console.log(`Attempting to delete product with ID: ${id}`);

        const url = new URL(`/api/products/${id}`, this.host);

        console.log(`Request URL: ${url}`);

        const headers = new Headers({
            'apikey': this.apikey,
            'Content-Type': 'application/json'
        });

        const options = {
            method: "DELETE",
            headers
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Error deleting product: ${response.statusText}`);

            return true;
        } catch (err) {
            console.error("Error deleting product:", err);
            throw err;
        }
    };
}

// Export an instance of ProductService
export default new ProductService();