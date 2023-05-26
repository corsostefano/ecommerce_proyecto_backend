const stripe = Stripe('pk_test_51NBR2CKYwzFziiomoZtnRzQBTqvfw4UxTPi0MdH6ff6dMBIEsfkMbOslUvBhmnWz7JJ6DUIdzkopOSujTnAciram00Nxt5mkWR');

const checkoutForm = document.getElementById('checkout-form');
const messageCheckout = document.getElementById('message-checkout');

checkoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvc = document.getElementById('card-cvc').value;

    // Crear un token de tarjeta con Stripe
    const { token, error } = await stripe.createToken('card', {
        number: cardNumber,
        exp_month: cardExpiry.slice(0, 2),
        exp_year: cardExpiry.slice(3),
        cvc: cardCvc
    });

    if (error) {
        // Mostrar el mensaje de error
        messageCheckout.innerText = error.message;
    } else {
        // Enviar el token de tarjeta al servidor para procesar el pago
        const response = await fetch('/procesar-pago', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token.id })
        });

        if (response.ok) {
            // Pago exitoso
            messageCheckout.innerText = 'Pago procesado correctamente';
        } else {
            // Error en el procesamiento del pago
            const errorData = await response.json();
            messageCheckout.innerText = errorData.error;
        }
    }
});

// Obtén el contenedor de los detalles del carrito
const cartItemsContainer = document.getElementById('cart-items');

// Obtén los elementos de producto individuales
const productElements = cartItemsContainer.getElementsByClassName('product');

// Crea un array para almacenar los datos de los productos
const productsData = [];

// Recorre cada elemento de producto y agrega los datos al array
for (let i = 0; i < productElements.length; i++) {
  const productElement = productElements[i];
  const productName = productElement.querySelector('h3').textContent;
  const productPrice = productElement.querySelector('p').textContent;

  // Crea un objeto de producto con los datos obtenidos
  const productData = {
    name: productName,
    price: productPrice,
  };

  // Agrega el objeto de producto al array
  productsData.push(productData);
}

// Actualiza los campos ocultos en el formulario de checkout con los datos del carrito
const hiddenField = document.createElement('input');
hiddenField.type = 'hidden';
hiddenField.name = 'cartItems';
hiddenField.value = JSON.stringify(productsData);
document.getElementById('checkout-form').appendChild(hiddenField);
