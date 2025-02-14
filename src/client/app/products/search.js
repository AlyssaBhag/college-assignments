/*
Name: Alyssa Bhagwandin
Filename: search.js
Course: INFT 2202
Created Date: January 8th, 2025
Last Edited Date: January 30th, 2025
Description: This is my list.js/now the search.js file
*/

// import productMockService from "./product.mock.service.js";
import productService from "./product.service.js";

console.log("We are on the product list page");

// Get references to key UI elements.
const eleContainer = document.getElementById('product-form');
// const cardBody= document.querySelector('cardBody');
const eleMessageBox = document.getElementById('message-box');
const elePaginationContainer = document.getElementById('pagination-container');

const eleSelectedPerPage = document.getElementById('selectedPerPage');
const elePerPageOptions = document.querySelectorAll('.per-page-option');

// Retrieve query parameters from the URL.
const url = new URL(window.location);
const search = url.searchParams;

console.log(document.getElementById("pagination-container"));

// Default values for pagination.
const page = parseInt(search.get('page') ?? 1);
//! I changed this to 8 pages instead of 6.
const perPage = parseInt(search.get('perPage') ?? 4);
console.log(`Page: ${page}, Per Page: ${perPage}`);

/**
 * Loads products and handles pagination.
 * Fetches products, calculates pagination, and updates the UI.
 * @async
 */
async function loadProducts() {
    try {

        const url = new URL(window.location);
        // ! Number of products per page (default: 4).
        const perPage = parseInt(url.searchParams.get('perPage')) || 4;
        // ! Current page number (default: 1).
        const page = parseInt(url.searchParams.get('page')) || 1;
        console.log(`Page: ${page}, Per Page: ${perPage}`);

        // Retrieve all products.
        // const records = productMockService.getAllProducts();
        const records = await productService.getAllProducts(); // Ensure records is an array.
        console.log("Records Type:", typeof records); // Debugging log.
        console.log("Records Content:", records); // Check what is returned.

        if (!Array.isArray(records)) {
            throw new Error("getAllProducts() did not return an array");
        }

        // Calculate total pages.
        const totalPages = Math.ceil(records.length / perPage);
        console.log('Total pages:', totalPages);
        const currentRecords = records.slice((page - 1) * perPage, page * perPage);
        console.log("Retrieved records:", currentRecords);

        // Declared some variable for later instead of doing them kinda messy like my in class.
        toggleDisplay(currentRecords);
        drawProductCards(currentRecords);


        drawPaginationLinks(elePaginationContainer, page, totalPages);

    } catch (error) {

        console.error("Error loading Products:", error);
        eleMessageBox.textContent = "Error loading products. Please try again later.";
        eleMessageBox.classList.remove('d-none');
        
    }
}

/**
 * Delays execution for a given time.
 * @param {number} ms - Milliseconds to wait.
 * @returns {Promise<void>} A promise that resolves after the given time.
 */
function waitTho (ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Update the dropdown display with the selected value
if (eleSelectedPerPage) {
    eleSelectedPerPage.textContent = perPage;
}

// Attach event listeners to the dropdown options
if (elePerPageOptions) {
    elePerPageOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            const newPerPage = parseInt(option.getAttribute('data-value'));

            // Update selected perPage value
            eleSelectedPerPage.textContent = newPerPage;

            // Update the URL query parameter
            const url = new URL(window.location);
            url.searchParams.set('perPage', newPerPage);
            // Forces the pagination to start at Page 1
            url.searchParams.set('page', 1); 
             // Update URL without reloading
            window.history.pushState({}, '', url);

            // Reload the products with the new perPage value
            loadProducts();
        });
    });
}

/**
 * Toggles UI elements based on product availability.
 * @param {Array} products - List of products to check.
 */
function toggleDisplay(products) {
    if (products.length === 0) {
        eleMessageBox.classList.remove('d-none');
        eleContainer.classList.add('d-none');
    } else {
        eleMessageBox.classList.add('d-none');
        eleContainer.classList.remove('d-none');
    }
}

/**
 * Retrieves the current user ID from local storage.
 * @returns {string} User ID or default "AlyssaBhag" if not found.
 */
function getCurrentUserId() {
    return localStorage.getItem("userId") || "AlyssaBhag";
}

/**
 * Creates and displays product cards dynamically based on the given product list.
 * @param {Array} products - List of products to be displayed.
 */
function drawProductCards(products) {
    // Clear the container before adding new products.
    eleContainer.innerHTML = ''; 
    console.log(products);
    toggleDisplay(products);

    // Get the currently logged-in user's GitHub ID (Modify this based on your login system)
    const currentUserId = getCurrentUserId(); 

    for (const product of products) {
        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('col-md-3', 'mb-3');

        const card = document.createElement('div');
        card.classList.add('card', 'h-100', 'shadow-sm', 'p-2');
        // Product image.
        const img = document.createElement('img');
        img.classList.add('card-img-top', 'p-1', 'rounded');
        img.src = '../../img/inven.jpg';
        img.alt = "Product Image";

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column');
        // Product name.
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title', 'fw-bold', 'text-name-games');
        cardTitle.textContent = product.name;
        // Product description.
        const cardText = document.createElement('p');
        cardText.classList.add('card-text', 'text-muted');
        cardText.innerHTML = `<strong>Description:</strong> ${product.description}`;
        // Product price.
        const priceText = document.createElement('p');
        priceText.classList.add('card-text', 'fw-bold', 'text-success', 'fs-5');
        priceText.innerHTML = `<strong>Price:</strong> ${product.price.toFixed(2)}`;
        // Removes default bottom margin.
        priceText.classList.add('mb-0');
        // Product stock.
        const stockText = document.createElement('p');
        stockText.classList.add('card-text', 'text-secondary');
        stockText.innerHTML = `<strong>Stock:</strong> ${product.stock}`;
        // Removes default bottom margin.
        stockText.classList.add('mb-2');
        // ! Added a container to ensure price & stock stay at the bottom.
        const cardFooter = document.createElement('div');
        cardFooter.classList.add('mt-auto'); 

        // ! Create a container to group "Listed By" and "Listed Date"
        const listedInfoContainer = document.createElement('div');
        listedInfoContainer.classList.add('text-end', 'text-muted', 'small', 'mt-auto');

        // ! "Listed By" section
        const listedPerson = document.createElement('p');
        listedPerson.innerHTML = `<em>Listed By:</em> ${product.owner.githubId}`;

        // ! Format and display the "Listed Date"
        const listedDate = new Date(product.createdDate).toLocaleDateString();
        const listedPersonDate = document.createElement('p');
        // Removes default bottom margin.
        listedPerson.classList.add('mb-0');
        listedPersonDate.innerHTML = `<em>Listed Date:</em> ${listedDate}`;

        // Button container.
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mt-3');
        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('btn', 'btn-cart');
        addToCartButton.innerHTML = '<i class="fa-solid fa-cart-plus"></i>';
        addToCartButton.setAttribute('data-bs-toggle', 'tooltip');
        addToCartButton.setAttribute('title', 'Click here to add your product to your cart!');

        // This whole area deals with the buttons on the edit and delete, 
        // including the image for them and the tooltips!

        // Edit button.
        const eleEditLink = document.createElement('a');
        eleEditLink.classList.add('btn', 'btn-primary');
        eleEditLink.innerHTML = `<i class="fas fa-edit"></i>`;
        eleEditLink.href = `create.html?id=${product.id}`;
        eleEditLink.setAttribute('data-bs-toggle', 'tooltip');
        eleEditLink.setAttribute('title', 'Click here to update your product!');

        // Delete button.
        const eleDelete = document.createElement('button');
        eleDelete.classList.add("btn", "btn-danger");
        eleDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
        eleDelete.addEventListener('click', () => onDeleteClick(product));
        eleDelete.setAttribute('data-bs-toggle', 'tooltip');
        eleDelete.setAttribute('title', 'Click here to delete your product');
        
        // ! Append price & stock inside the footer so they're always at the bottom.
        cardFooter.append(priceText, stockText);
        // ! Append both elements inside the container right below one another.
        listedInfoContainer.appendChild(listedPerson);
        listedInfoContainer.appendChild(listedPersonDate);
        // Add to card button.
        buttonContainer.append(addToCartButton, eleEditLink, eleDelete);
        cardBody.append(cardTitle, cardText, cardFooter, listedInfoContainer, buttonContainer);
        card.append(img, cardBody);
        cardWrapper.append(card);
        eleContainer.appendChild(cardWrapper);
            
        // Disable edit and delete buttons if the current user is NOT the owner.
        // The add to cart stays!
        if (product.owner.githubId !== currentUserId) {
            eleEditLink.disabled = true;
            eleDelete.disabled = true;
            eleEditLink.classList.add('disabled');
            eleDelete.classList.add('disabled');
        }

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
function editProduct(productId) {
    window.location.href = `create.html?id=${productId}`;
}

/**
 * Handles the deletion of a product, including confirmation via a modal.
 * @param {number} id - Product ID to delete.
 */
// Handles product deletion with modal confirmation.
async function onDeleteClick(product) {
    const eleModalWindow = document.getElementById('ConfirmModal');
    const modal = new bootstrap.Modal(eleModalWindow);

    console.log("Full product object:", product); // Log to check the structure

    // Use the correct key ('id' instead of 'productId')
    const productId = product.id;

    if (!productId) {
        console.error('Product ID not found!');
        return; // Exit early if the productId is not found
    }

    console.log("Product ID:", productId); // Debugging log

    eleModalWindow.querySelector('.btn-danger').addEventListener('click', async () => {
        try {
        // Disable ALL buttons, including Edit, Delete, and Pagination
        document.querySelectorAll('.btn, a.btn, .page-link').forEach(btn => btn.classList.add('disabled'));

            // Show loading spinner in message box
            eleMessageBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting Product...';
            eleMessageBox.classList.remove('d-none');

            modal.hide();
            // Wait for 3 seconds before refreshing the page
            await waitTho(3000);

            console.log("Deleting product with ID:", productId); // Debugging log
            // Call the deleteProduct function from the service
            await productService.deleteProduct(productId);

            // Fetch the updated product list
            const records = await productService.getAllProducts();

            // Update the visibility of the table based on the number of products.
            toggleDisplay(records);

            if (records.length === 0) {
                eleMessageBox.innerHTML = "No product found.";
                eleMessageBox.classList.remove('d-none');
                console.log("No products available");
            } else {
                eleMessageBox.classList.add('d-none');
            }

            // Reload the page after deletion.
            window.location.href = 'search.html';

            drawPaginationLinks(elePaginationContainer, page, totalPages);
        } catch (error) {
            eleMessageBox.textContent = error.message;
            eleMessageBox.classList.remove('d-none');

            // Re-enable buttons in case of failure.
            document.querySelectorAll('.btn').forEach(btn => btn.disabled = false);
        }
        // Close the modal.
        modal.hide();
    });

    modal.show();
}


/**
 * Handles the "Confirm" button click event.
 * Redirects to the search page and closes the modal.
 *
 * @param {Object} product - The product being confirmed.
 * @param {Object} modal - The modal instance to be closed.
 * @returns {Function} A function that executes the confirmation logic.
 */
function onConfirm(product, modal) {
    return () => {
        console.log(`Confirmed action for animal: ${product.name}`);
        // After confirmation it redirects the page... I can also do refresh but it only rereshed it and not changes you back to the page you need.
        window.location = 'search.html';
        // Close the modal after confirmation.
        modal.hide(); 
    };
}

// Call the function to load products.
loadProducts();
