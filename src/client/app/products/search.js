/*
Name: Alyssa Bhagwandin
Filename: search.js
Course: INFT 2202
Created Date: January 8th, 2025
Last Edited Date: January 30th, 2025
Description: This is my list.js/now the search.js file
*/

import productMockService from "./product.mock.service.js";

console.log("We are on the product list page");

const eleContainer = document.getElementById('product-form');
// const cardBody= document.querySelector('cardBody');
const eleMessageBox = document.getElementById('message-box');
const elePaginationContainer = document.getElementById('pagination-container');

const url = new URL(window.location);
const search = url.searchParams;

console.log(document.getElementById("pagination-container"));

// Default values for pagination.
const page = parseInt(search.get('page') ?? 1);
const perPage = parseInt(search.get('perPage') ?? 6);
console.log(`Page: ${page}, Per Page: ${perPage}`);

// Retrieve all products.
const records = productMockService.getAllProducts();
console.log('All products in local storage:', records);

// Calculate total pages.
const totalPages = Math.ceil(records.length / perPage);
console.log('Total pages:', totalPages);

// Get the records for the current page.
const currentRecords = records.slice((page - 1) * perPage, page * perPage);

// Declared some variable for later instead of doing them kinda messy like my in class.
toggleDisplay(currentRecords);
drawProductCards(currentRecords);


// Toggle visibility if no products are available.
function toggleDisplay(products) {
    if (products.length === 0) {
        eleMessageBox.classList.remove('d-none');
        eleContainer.classList.add('d-none');
    } else {
        eleMessageBox.classList.add('d-none');
        eleContainer.classList.remove('d-none');
    }
}

function drawProductCards(products) {
    // Clear the container before adding new products.
    eleContainer.innerHTML = ''; 
    console.log(products);
    toggleDisplay(products);

    for (const product of products) {
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('col-md-4', 'mb-4');

        const card = document.createElement('div');
        card.classList.add('card', 'h-100');

        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = '../../img/inven.jpg';
        img.alt = "Product Image";

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = product.name;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text', 'mb-1'); 
        cardText.textContent = product.description;

        const priceText = document.createElement('p');
        priceText.classList.add('card-text', 'fw-bold');
        priceText.innerHTML = `<strong>Price:</strong> $${product.price.toFixed(2)}`;

        const stockText = document.createElement('p');
        stockText.classList.add('card-text');
        stockText.innerHTML = `<strong>Stock:</strong> ${product.stock}`;

        // Button container.
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-flex', 'justify-content-between');
        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('btn', 'btn-success');
        addToCartButton.innerHTML = '<i class="fa-solid fa-cart-plus"></i>';
        addToCartButton.setAttribute('data-bs-toggle', 'tooltip');
        addToCartButton.setAttribute('title', 'Click here to add your product to your cart!');

        // This whole area deals with the buttons on the edit and delete, 
        // including the image for them and the tooltips!

        // Edit button.
        const eleEditLink = document.createElement('a');
        eleEditLink.classList.add('btn', 'btn-primary', 'me-2');
        eleEditLink.innerHTML = `<i class="fas fa-edit"></i>`;
        eleEditLink.href = `create.html?id=${product.id}`;
        eleEditLink.setAttribute('data-bs-toggle', 'tooltip');
        eleEditLink.setAttribute('title', 'Click here to update your product!');

        // Delete button.
        const eleDelete = document.createElement('button');
        eleDelete.classList.add("btn", "btn-danger");
        eleDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
        eleDelete.addEventListener('click', () => onDeleteClick(product.id));
        eleDelete.setAttribute('data-bs-toggle', 'tooltip');
        eleDelete.setAttribute('title', 'Click here to delete your product');

        // Add to card button.
        buttonContainer.append(addToCartButton, eleEditLink, eleDelete);
        cardBody.append(cardTitle, cardText, priceText, stockText, buttonContainer);
        card.append(img, cardBody);
        cardWrapper.append(card);
        eleContainer.appendChild(cardWrapper);
    }
}

// Render pagination controls.
function drawPaginationLinks(elePaginationContainer, currentPage, totalPages) {
    const elePaginationLinks = elePaginationContainer.querySelector('ul.pagination');
    
    elePaginationLinks.innerHTML = '';
    

    // Create "Previous" button.
    const prevButton = document.createElement("li");
    prevButton.classList.add("page-item");
    if (currentPage === 1){
         prevButton.classList.add("disabled");
    }   

    prevButton.innerHTML = `<a class="page-link" href="search.html?page=${currentPage - 1}">Previous</a>`;
    elePaginationLinks.appendChild(prevButton);

    // Create numbered page links.
    for (let i = 1; i <= totalPages; i++) {
        const elePageItem = document.createElement('li');
        elePageItem.classList.add('page-item');

        if (i === currentPage) {
            elePageItem.classList.add('active');
        }

        const elePageLink = document.createElement('a');
        elePageLink.classList.add('page-link');
        elePageLink.textContent = i;
        elePageLink.setAttribute('href', `search.html?page=${i}`);

        elePageItem.appendChild(elePageLink);
        elePaginationLinks.appendChild(elePageItem);
    }

    // Create "Next" button.
    const nextButton = document.createElement("li");
    nextButton.classList.add("page-item");
    if (currentPage === totalPages) {
        nextButton.classList.add("disabled");
    }

    nextButton.innerHTML = `<a class="page-link" href="search.html?page=${currentPage + 1}">Next</a>`;
    elePaginationLinks.appendChild(nextButton);
    }


// Handles product edit action.
function editProduct(id) {
    window.location.href = `create.html?id=${id}`;
}

// Handles product deletion with modal confirmation.
function onDeleteClick(id) {
    const eleModalWindow = document.getElementById('ConfirmModal');
    const modal = new bootstrap.Modal(eleModalWindow);
    
    eleModalWindow.querySelector('.btn-danger').addEventListener('click', () => {
        try {
            productMockService.deleteProduct(id);
            // Reload the page after deletion.
            window.location.href = 'search.html';
            drawPaginationLinks(elePaginationContainer, page, totalPages);
        } catch (error) {
            eleMessageBox.textContent = error.message;
            eleMessageBox.classList.remove('d-none');
        }
        // Close the modal.
        modal.hide();
    });
    
    modal.show();
}

drawPaginationLinks(elePaginationContainer, page, totalPages);