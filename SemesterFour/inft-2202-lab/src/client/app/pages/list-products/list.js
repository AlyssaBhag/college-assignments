/*
Name: Alyssa Bhagwandin
Filename: list.js
Course: INFT 2202
Created Date: April 09, 2024
Description: This is the list page of the website. It displays a list of products with pagination and allows users to edit or delete products.
*/

import template from './list.ejs';

import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';

export default () => {
  const html = template();
  document.getElementById('app').innerHTML = html;

  // Fetch and display products
  loadProducts();

  // Attach event listeners for edit and delete actions
  attachEventListeners();
};

function showSpinner(message = 'Loading...') {
  const messageBox = document.getElementById('message-box');
  const messageText = document.getElementById('message-text');

  if (messageBox && messageText) {
    messageBox.classList.remove('d-none');
    messageText.innerHTML = `<i class="fa fa-spinner fa-spin"></i> ${message}`;
  }
}

function hideSpinner() {
  const messageBox = document.getElementById('message-box');
  const messageText = document.getElementById('message-text');

  if (messageBox && messageText) {
    messageBox.classList.add('d-none');
    messageText.innerHTML = '';
  }
}

async function loadProducts() {
  try {
    showSpinner('Loading products...');
    const url = new URL(window.location);
    const perPage = parseInt(url.searchParams.get('perPage')) || 5;
    const page = parseInt(url.searchParams.get('page')) || 1;

    const response = await fetch(`/api/products?page=${page}&perPage=${perPage}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch products: ${errorText}`);
    }

    const data = await response.json();
    const { records, pagination } = data;
    drawProductCards(records);
    drawPaginationLinks(document.getElementById('pagination-container'), pagination.current, pagination.pages);
  } catch (error) {
    console.error('Error loading products:', error);
    const messageBox = document.getElementById('message-box');
    if (messageBox) {
      messageBox.textContent = 'Error loading products. Please try again later.';
      messageBox.classList.remove('d-none');
    }
  } finally {
    hideSpinner();
  }
}

function drawProductCards(records) {
  console.log('Product Records:', records); // Debug line to log all records

  const productsGrid = document.getElementById('products-grid');
  const messageBox = document.getElementById('message-box');

  productsGrid.innerHTML = '';
  toggleGridVisibility(records);

  records.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('col');
    card.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">
            <strong>Price:</strong> $${product.price.toFixed(2)}<br>
            <strong>Stock:</strong> ${product.stock}<br>
            <strong>Description:</strong> ${product.description}
          </p>
          <div class="btn-group">
            <button class="btn btn-primary btn-sm edit-btn" data-id="${product._id}">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${product._id}">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

function toggleGridVisibility(records) {
  const productsGrid = document.getElementById('products-grid');
  const messageBox = document.getElementById('message-box');

  if (records.length === 0) {
    messageBox.textContent = 'No products found.';
    messageBox.classList.remove('d-none');
    productsGrid.classList.add('d-none');
  } else {
    messageBox.classList.add('d-none');
    productsGrid.classList.remove('d-none');
  }
}

function drawPaginationLinks(container, currentPage, totalPages) {
  const paginationLinks = container.querySelector('ul.pagination');
  paginationLinks.innerHTML = '';

  const url = new URL(window.location);
  const perPage = parseInt(url.searchParams.get('perPage')) || 5;

  const prevButton = document.createElement('li');
  prevButton.classList.add('page-item');
  if (currentPage === 1) {
    prevButton.classList.add('disabled');
  }
  prevButton.innerHTML = `<a class="page-link" href="?page=${currentPage - 1}&perPage=${perPage}">Previous</a>`;
  paginationLinks.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement('li');
    pageItem.classList.add('page-item');
    if (i === currentPage) {
      pageItem.classList.add('active');
    }
    pageItem.innerHTML = `<a class="page-link" href="?page=${i}&perPage=${perPage}">${i}</a>`;
    paginationLinks.appendChild(pageItem);
  }

  const nextButton = document.createElement('li');
  nextButton.classList.add('page-item');
  if (currentPage === totalPages) {
    nextButton.classList.add('disabled');
  }
  nextButton.innerHTML = `<a class="page-link" href="?page=${currentPage + 1}&perPage=${perPage}">Next</a>`;
  paginationLinks.appendChild(nextButton);
}

function attachEventListeners() {
  const productsGrid = document.getElementById('products-grid');

  productsGrid.addEventListener('click', async (event) => {
    const target = event.target;

    // Handle edit button click
    if (target.closest('.edit-btn')) {
      const productId = target.closest('.edit-btn').dataset.id;
      await editProduct(productId);
    }

    // Handle delete button click
    if (target.closest('.delete-btn')) {
      const productId = target.closest('.delete-btn').dataset.id;
      await deleteProduct(productId);
    }
  });
}

async function editProduct(productId) {
  try {
    // Redirect to the "Create" page with the product ID as a query parameter
    window.location.href = `/create?id=${productId}`;
  } catch (error) {
    console.error('Error redirecting to edit product:', error);
    const messageBox = document.getElementById('message-box');
    if (messageBox) {
      messageBox.textContent = `Error redirecting to edit product: ${error.message}`;
      messageBox.classList.remove('d-none');
    }
  }
}

async function deleteProduct(productId) {
  const modalElement = document.getElementById('ConfirmModal');
  if (!modalElement) {
    console.error('ConfirmModal element not found');
    return;
  }

  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  const confirmButton = modalElement.querySelector('.confirm-delete-btn');
  if (!confirmButton) {
    console.error('Confirm delete button not found');
    return;
  }

  confirmButton.addEventListener(
    'click',
    async () => {
      try {
        showSpinner('Deleting product...');
        const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        modal.hide();
        loadProducts(); // Reload the product list
      } catch (error) {
        console.error('Error deleting product:', error);
        const messageBox = document.getElementById('message-box');
        if (messageBox) {
          messageBox.textContent = `Error deleting product: ${error.message}`;
          messageBox.classList.remove('d-none');
        }
      } finally {
        hideSpinner();
      }
    },
    { once: true }
  );
}