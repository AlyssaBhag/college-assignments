import template from './search.ejs';

export default () => {
  const html = template();
  document.getElementById('app').innerHTML = html;

  // Fetch and display animals
  loadAnimals();
};

async function loadAnimals() {
  try {
    const url = new URL(window.location);
    const perPage = parseInt(url.searchParams.get('perPage')) || 5;
    const page = parseInt(url.searchParams.get('page')) || 1;
    const records = await response.json();

    const response = await fetch('/api/animals');
    if (!response.ok) {
      throw new Error('Failed to fetch animals');
    }


    if (!Array.isArray(records)) {
      throw new Error('Invalid response format: Expected an array');
    }

    const totalPages = Math.ceil(records.length / perPage);
    const currentRecords = records.slice((page - 1) * perPage, page * perPage);

    drawAnimalTable(currentRecords);
    drawPaginationLinks(document.getElementById('pagination-container'), page, totalPages);
  } catch (error) {
    console.error('Error loading animals:', error);
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = 'Error loading animals. Please try again later.';
    messageBox.classList.remove('d-none');
  }
}

function drawAnimalTable(records) {
  const tableBody = document.querySelector('#animals-list tbody');
  const messageBox = document.getElementById('message-box');
  const table = document.getElementById('animals-list');

  tableBody.innerHTML = '';
  toggleTableVisibility(records);

  records.forEach((animal) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${animal.owner || 'Alyssa'}</td>
      <td>${animal.name} (${animal.breed}, ${animal.eyes} eyes, ${animal.legs} legs, sounds like "${animal.sound}")</td>
      <td>
        <button class="btn btn-primary btn-sm" onclick="editAnimal('${animal._id}')">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteAnimal('${animal._id}')">
          <i class="fas fa-trash"></i> Delete
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function toggleTableVisibility(records) {
  const table = document.getElementById('animals-list');
  const messageBox = document.getElementById('message-box');

  if (records.length === 0) {
    messageBox.textContent = 'No animals found.';
    messageBox.classList.remove('d-none');
    table.classList.add('d-none');
  } else {
    messageBox.classList.add('d-none');
    table.classList.remove('d-none');
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

async function deleteAnimal(_id) {
  const modal = new bootstrap.Modal(document.getElementById('ConfirmModal'));
  modal.show();

  document.querySelector('.btn-danger').addEventListener('click', async () => {
    try {
      const response = await fetch(`/api/animals/${_id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete animal');
      }

      modal.hide();
      loadAnimals();
    } catch (error) {
      console.error('Error deleting animal:', error);
      const messageBox = document.getElementById('message-box');
      messageBox.textContent = `Error deleting animal: ${error.message}`;
      messageBox.classList.remove('d-none');
    }
  });
}

function editAnimal(id) {
  window.location.href = `create.html?id=${id}`;
}