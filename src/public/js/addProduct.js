import axios from 'axios';

const form = document.querySelector('#addProductForm');

form.addEventListener('submit', async (event) => {

  event.preventDefault();
  const formData = new FormData(form);
  try {
    const response = await axios.post('/productos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    window.location.href = '/';
  } catch (error) {
    console.error(error);
  }
});
