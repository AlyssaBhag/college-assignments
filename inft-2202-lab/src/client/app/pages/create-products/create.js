/*
Name: Alyssa Bhagwandin
Filename: create.js
Course: INFT 2202
Created Date: April 09, 2024
Description: This is the create product page for the website.
*/

import template from './create.ejs';

export default async function (params) {
    try {
        const data = await onInit(params);
        const html = template(data);
        document.getElementById('app').innerHTML = html;
        await onRender();
    } catch (error) {
        console.error('Error in create-product:', error);
    }
}

async function onInit(params) {
    if (params?.id) {
        const response = await fetch(`/api/products/${params.id}`);
        const product = await response.json();
        return { product };
    }
    return { product: null };
}

async function onRender() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        // Edit mode: Fetch product details and populate the form
        await setupEditForm(productId);
    }

    const form = document.getElementById('product-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
}

async function setupEditForm(productId) {
    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        const product = await response.json();

        // Update the header to "Edit Product"
        const header = document.querySelector('h1');
        if (header) {
            header.textContent = 'Edit Product';
        }

        // Populate the form fields with the product data
        const form = document.getElementById('product-form');
        if (form) {
            form.querySelector('[name="name"]').value = product.name;
            form.querySelector('[name="price"]').value = product.price;
            form.querySelector('[name="stock"]').value = product.stock;
            form.querySelector('[name="description"]').value = product.description;

            // Add a hidden field for the product ID
            let idField = form.querySelector('[name="_id"]');
            if (!idField) {
                idField = document.createElement('input');
                idField.type = 'hidden';
                idField.name = '_id';
                form.appendChild(idField);
            }
            idField.value = product._id;
        }
    } catch (error) {
        console.error('Error setting up edit form:', error);
        const messageBox = document.getElementById('message-box');
        if (messageBox) {
            messageBox.textContent = `Error loading product details: ${error.message}`;
            messageBox.classList.remove('d-none');
        }
    }
}

async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const product = Object.fromEntries(formData);

    const url = product._id ? `/api/products/${product._id}` : '/api/products';
    const method = product._id ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to save product: ${errorText}`);
        }

        const savedProduct = await response.json();
        console.log('Product saved successfully:', savedProduct);

        // Redirect to the product list page
        window.location.href = '/products';
    } catch (error) {
        console.error('Error saving product:', error);
        const messageBox = document.getElementById('message-box');
        if (messageBox) {
            messageBox.textContent = `Error saving product: ${error.message}`;
            messageBox.classList.remove('d-none');
        }
    }
}