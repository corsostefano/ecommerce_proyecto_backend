const stripe = Stripe('pk_test_51NBR2CKYwzFziiomoZtnRzQBTqvfw4UxTPi0MdH6ff6dMBIEsfkMbOslUvBhmnWz7JJ6DUIdzkopOSujTnAciram00Nxt5mkWR');

const checkoutForm = document.getElementById('checkout-form');
const messageCheckout = document.getElementById('message-checkout');

checkoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();

 
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvc = document.getElementById('card-cvc').value;

    const { token, error } = await stripe.createToken('card', {
        number: cardNumber,
        exp_month: cardExpiry.slice(0, 2),
        exp_year: cardExpiry.slice(3),
        cvc: cardCvc
    });

    if (error) {
        messageCheckout.innerText = error.message;
    } else {
        const response = await fetch('/procesar-pago', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token.id })
        });

        if (response.ok) {
            messageCheckout.innerText = 'Pago procesado correctamente';
        } else {
            const errorData = await response.json();
            messageCheckout.innerText = errorData.error;
        }
    }
});

const cartItemsContainer = document.getElementById('cart-items');

const productElements = cartItemsContainer.getElementsByClassName('product');

const productsData = [];

for (let i = 0; i < productElements.length; i++) {
  const productElement = productElements[i];
  const productName = productElement.querySelector('h3').textContent;
  const productPrice = productElement.querySelector('p').textContent;

  const productData = {
    name: productName,
    price: productPrice,
  };

  productsData.push(productData);
}

const hiddenField = document.createElement('input');
hiddenField.type = 'hidden';
hiddenField.name = 'cartItems';
hiddenField.value = JSON.stringify(productsData);
document.getElementById('checkout-form').appendChild(hiddenField);
