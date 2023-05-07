// Importa la librería Axios para enviar los datos del formulario a través de una petición HTTP.
import axios from 'axios';

// Selecciona el formulario en el DOM.
const form = document.querySelector('#addProductForm');

// Agrega un listener al evento 'submit' del formulario.
form.addEventListener('submit', async (event) => {
  // Previene que el formulario se envíe mediante el método 'POST' tradicional.
  event.preventDefault();

  // Crea un objeto FormData para almacenar los datos del formulario y el archivo de imagen.
  const formData = new FormData(form);

  // Envía los datos del formulario a través de una petición HTTP utilizando Axios.
  try {
    const response = await axios.post('/productos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Si la petición se completa correctamente, redirige al usuario a la página de inicio.
    window.location.href = '/';
  } catch (error) {
    // Si la petición falla, muestra un mensaje de error en la consola del navegador.
    console.error(error);
  }
});
