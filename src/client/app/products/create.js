/*
Name: Alyssa Bhagwandin
Filename: create.js
Course: INFT 2202
Created Date: January 13th, 2025
Last Edited Date: January 30th, 2025
Description: This is my create.js file for managing products. this is a test
*/

// Importing modules.
import Product from './product.js'; 
import productService from "./product.service.js";

console.log("ProductService works if it shows here:", productService);
console.log('create.js loaded');

console.log("Full URL:", window.location.href);
const searchParams = new URLSearchParams(window.location.search);
const editId = searchParams.get('id'); 
const isEditMode = editId ? true : false;
const eleSubmitBtn = document.getElementById('submitBtn');

if (isEditMode) {
    setupEditForm(editId);
    console.log("edit");
} else {
    console.log("add");
}

const eleForm = document.getElementById('product-form');
if (eleForm) {
    eleForm.addEventListener('submit', submitProductForm);
}

async function setupEditForm(editId) {
    if (!editId || editId === "undefined") {
        console.error("Error: editId is invalid:", editId);
        return;
    }

    const eleHeading = document.querySelector('h1');
    eleHeading.textContent = "Editing Existing Product";
    const existingProduct = await productService.findProduct(editId);

    if (existingProduct) {
        const eleProductForm = document.getElementById('product-form');
        eleProductForm.name.value = existingProduct.name;
        eleProductForm.name.disabled = true;
        eleProductForm.description.value = existingProduct.description;
        eleProductForm.price.value = existingProduct.price.toFixed(2); 
        eleProductForm.stock.value = existingProduct.stock;
        // eleProductForm.owner.value = existingProduct.owner;
    } else {
        alert("Product not found!");
        window.location.href = "search.html";   
    }
}

function waitTho(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function submitProductForm(event) {
    event.preventDefault();

    const productForm = event.target;
    const eleNameError = document.getElementById('message-box');
    const spinner = document.getElementById('spinner');
    const valid = validateProductForm(productForm);
    eleNameError.classList.add('d-none');

    if (valid) {
        console.log('valid, lets save the product!');
        const productObject = new Product({
            _id: editId,
            name: productForm.name.value.trim(),
            description: productForm.description.value.trim(),
            price: parseFloat(productForm.price.value) || 0,
            stock: parseInt(productForm.stock.value) || 0,
            // owner: productForm.owner.value,
            owner: "Alyssa"
        });

        console.log("Final product object being sent:", productObject);

        try {
            const existingProducts = await productService.getAllProducts();
            const duplicate = existingProducts.find(p => p.name.toLowerCase() === productObject.name.toLowerCase());

            if (duplicate && !isEditMode) {
                throw new Error(`Product with name "${productObject.name}" already exists.`);
            }

            if (isEditMode) {
                console.log("Editing product:", editId);
                await productService.updateProduct(productObject);
            } else {
                await productService.createProduct(productObject);
            }
            
            spinner.classList.remove('d-none');
            productForm.name.disabled = true;
            productForm.description.disabled = true;
            productForm.price.disabled = true;
            productForm.stock.disabled = true;
            // productForm.owner.disabled = true;
            eleSubmitBtn.disabled = true;
            await waitTho(3000);

            const successModal = new bootstrap.Modal(document.getElementById('SuccessModal'));
            successModal.show();

            document.getElementById('modal-ok-btn').addEventListener('click', () => {
                console.log(" button clicked!");
                productForm.reset();
                window.location.href = "search.html";
            });

        } catch (error) {
            // hide the spinner when there are errors.
            spinner.classList.add('d-none'); 
            console.error("Error saving prodcut:", error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = error.message
        }
    } else {
        console.log('not valid')
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = 'Error! Your form was submitting incorrectly, please try again.';
    }
    console.log('You tried to submit me!')
}

function validateProductForm(productForm) {
    let valid = true;

    const name = productForm.name.value;
    const eleNameError = productForm.name.nextElementSibling;
    if (name === "") {
        valid = false;
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "Name must not be blank"; 
        productForm.name.style.borderColor = "red"; 
    } else {
        eleNameError.classList.add('d-none');
        productForm.name.style.borderColor = "green";
    }

    const description = productForm.description.value;
    const eleDescriptionError = productForm.description.nextElementSibling;
    if (description === "") {
        valid = false;
        eleDescriptionError.classList.remove('d-none');
        eleDescriptionError.textContent = "Description must not be blank"; 
        productForm.description.style.borderColor = "red";
    } else {
        eleDescriptionError.classList.add('d-none');
        productForm.description.style.borderColor = "green";
    }

    const price = productForm.price.value;
    const elePriceError = productForm.price.nextElementSibling;
    if (price === "" || isNaN(price)) {
        valid = false;
        elePriceError.classList.remove('d-none');
        elePriceError.textContent = "Price must be a numeric value.";
        productForm.price.style.borderColor = "red";
    } else {
        elePriceError.classList.add('d-none');
        productForm.price.style.borderColor = "green";
    }

    const stock = productForm.stock.value;
    const eleStockError = productForm.stock.nextElementSibling;
    if (stock === "" || isNaN(stock)) {
        valid = false;
        eleStockError.classList.remove('d-none');
        eleStockError.textContent = "Stock must be a numeric value."; 
        productForm.stock.style.borderColor = "red";
    } else {
        eleStockError.classList.add('d-none');
        productForm.stock.style.borderColor = "green";
    }


    return valid;
}

