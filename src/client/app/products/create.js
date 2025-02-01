/*
Name: Alyssa Bhagwandin
Filename: create.js
Course: INFT 2202
Created Date: January 13th, 2025
Last Edited Date: January 30th, 2025
Description: This is my create.js file for managing products.
*/

// Importing modules.
import Product from './product.js'; 
import productMockService from './product.mock.service.js';

// Retrieving URL parameters.
const url = new URL(window.location);
const searchParams = url.searchParams;
const eleMessageBox = document.getElementById('message-box');
const editId = searchParams.get('id');
const isEditMode = editId ? true : false;

// Checking if in edit or add mode, cuz sometimes it bugs.
if (isEditMode) {
    setupEditForm();
    console.log("edit mode");
} else {
    console.log("add mode");
}

// Adding form submission listener.
const eleForm = document.getElementById('product-form');
if (eleForm) {
    eleForm.addEventListener('submit', submitProductForm);
}

// Function to set up the form for editing an existing product.
function setupEditForm() {
    const eleHeading = document.querySelector('h1');
    eleHeading.textContent = "Editing Existing Product";
    const existingProduct = productMockService.findProduct(editId);

    if (existingProduct) {
        const eleProductForm = document.getElementById('product-form');
        eleProductForm.name.value = existingProduct.name;
        eleProductForm.name.disabled = true;
        eleProductForm.description.value = existingProduct.description;
        eleProductForm.price.value = existingProduct.price.toFixed(2); 
        eleProductForm.stock.value = existingProduct.stock;
    } else {
        // If product not found, display message and redirect.
        eleMessageBox.classList.remove('d-none');
        window.location.href = "search.html";
    }
}

// Function to handle form submission.
function submitProductForm(event) {
    event.preventDefault();

    const productForm = event.target;
    const eleNameError  = document.getElementById('message-box');
    const spinner = document.getElementById('spinner');
    const valid = validateProductForm(productForm);

    // Clear previous messages
    eleNameError.classList.add('d-none');

    if (valid) {
        // Creating or updating product object based on form data.
        const productObject = new Product({
            id: editId,
            name: productForm.name.value,
            description: productForm.description.value,
            price: parseFloat(productForm.price.value),
            stock: parseInt(productForm.stock.value),
        });

        try {
            // Updating or creating product via mock service.
            if (isEditMode) {
                productMockService.updateProduct(productObject);
            } else {
                productMockService.createProduct(productObject);
            }
            spinner.classList.remove('d-none');
            // Show success modal after delay.
            setTimeout(() => {
                spinner.classList.add('d-none');
                const successModal = new bootstrap.Modal(document.getElementById('SuccessModal'));
                successModal.show();
                // Reset form and redirect on modal button click.
                document.getElementById('modal-ok-btn').addEventListener('click', () => {
                    productForm.reset();
                    window.location.href = "search.html";
                });
            }, 3000);

        } catch (error) {
            // Display error message if product operation fails.
            spinner.classList.add('d-none'); 
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = error.message;
        }
    } else {
        // Display generic error message if form validation fails.
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = 'Error! Your form was submitting incorrectly, please try again.';
    }
}

// Function to validate product form fields.
function validateProductForm(productForm) {
    let valid = true;

    // Validation for the product name.
    const name = productForm.name.value;
    const eleNameError = productForm.name.nextElementSibling;
    if (name === "") {
        valid = false;
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "Name must not be blank"; 
        //Changes the colour of the border of whatever is wrong to red.       
        productForm.name.style.borderColor = "red"; 
    } else {
        eleNameError.classList.add('d-none');
        //Changes the colour of the border of whatever is right to green.
        productForm.name.style.borderColor = "green";
    }

    // Validation for the product description.
    const description = productForm.description.value;
    const eleDescriptionError = productForm.description.nextElementSibling;
    if (description === "") {
        valid = false;
        eleDescriptionError.classList.remove('d-none');
        eleDescriptionError.textContent = "Description must not be blank"; 
        // Changes the colour.
        productForm.description.style.borderColor = "red";
    } else {
        eleDescriptionError.classList.add('d-none');
        // Changes the colour.
        productForm.description.style.borderColor = "green";
    }

    // Validation for the product price.
    const price = productForm.price.value;
    const elePriceError = productForm.price.nextElementSibling;
    if (price === "" || isNaN(price)) {
        valid = false;
        elePriceError.classList.remove('d-none');
        elePriceError.textContent = "Price must be a numeric value.";
        // Changes the colour.
        productForm.price.style.borderColor = "red";
    } else {
        elePriceError.classList.add('d-none');
        // Changes the colour.
        productForm.price.style.borderColor = "green";
    }

    // Validation for the product stock.
    const stock = productForm.stock.value;
    const eleStockError = productForm.stock.nextElementSibling;
    if (stock === "" || isNaN(stock)) {
        valid = false;
        eleStockError.classList.remove('d-none');
        eleStockError.textContent = "Stock must be a numeric value."; 
        // Changes the colour.
        productForm.stock.style.borderColor = "red";
    } else {
        eleStockError.classList.add('d-none');
        // Changes the colour.
        productForm.stock.style.borderColor = "green";
    }

    return valid;
}

