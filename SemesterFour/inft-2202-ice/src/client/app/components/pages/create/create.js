import template from './create.ejs';

export default () => {
  const html = template();
  document.getElementById('app').innerHTML = html;

  // Add event listener for form submission
  document.getElementById('animal-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const records = {
      name: document.getElementById('animalName').value,
      breed: document.getElementById('animalBreed').value,
      eyes: parseInt(document.getElementById('animalEyes')), 
      legs: parseInt(document.getElementById('animalLegs')), 
      sound: document.getElementById('animalSound').value,
      // owner: document.getElementById('Alyssa').value,
    };

    try {
      // Send POST request to create a new animal
      const response = await fetch('/api/animals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animalData),
      });

      if (!response.ok) {
        throw new Error('Failed to create animal');
      }

      const result = await response.json();

      // Display success message
      const messageBox = document.getElementById('message-box');
      messageBox.classList.remove('d-none');
      messageBox.classList.add('alert-success');
      document.getElementById('message-text').textContent = 'Animal created successfully!';
    } catch (error) {
      console.error('Error creating animal:', error);

      // Display error message
      const messageBox = document.getElementById('message-box');
      messageBox.classList.remove('d-none');
      messageBox.classList.add('alert-danger');
      document.getElementById('message-text').textContent = 'Failed to create animal.';
    }
  });
};