const linkProducts = document.getElementById('products-link-button');
const linkChat = document.getElementById('chat-link-button');
const outAccount = document.getElementById('out-account');
const selectSignInButton = document.getElementById('nav-signin');
const selectSignUpButton = document.getElementById('nav-signup');
const inAccount = document.getElementById('in-account');
const cartButton = document.getElementById('nav-cart');
const signOutButton = document.getElementById('nav-signout');
const loading = document.getElementById('loading-icon');
const cartDiv = document.getElementById('cart-div');
const cartProducts = document.getElementById('table-cart-products');
const buttonsCart = document.getElementById('buttons-cart');
const messageCart = document.getElementById('message-cart');

async function addExtrasCart() {
    const userLog = await fetch("http://localhost:8080/users/me");
    const user = await userLog.json();
    const cartLog = await fetch(`http://localhost:8080/carrito/${user.email}`);
    const cart = await cartLog.json();
    let total = 0;
    cart.products.forEach((prod) => {
        total = total + prod.price * prod.quantity;
    });
    cartProducts.innerHTML += `<td colspan="4"></td><td class="fw-bold">Total: $${total} </td>`;
    buttonsCart.innerHTML = `<button id='delete-cart-button' onclick="deleteCart('${cart._id}')" class='btn btn-danger'>Eliminar Carrito</button>
    <button id='buy-cart-button' onclick="buyCart('${cart._id}', '${user._id}')" class='btn btn-success'>Comprar</button>`;
}

async function loadWebPage() {
    loading.classList.remove('d-none');
    const userLog = await fetch("http://localhost:8080/users/me");
    const user = await userLog.json();
    const cartLog = await fetch(`http://localhost:8080/carrito/${user.email}`);
    const cart = await cartLog.json();
    cart.products.forEach((prod) => {
        showProductsCart(prod);
    });
    addExtrasCart();
    setTimeout(async () => {
        loading.classList.add('d-none');
        outAccount.classList.add('d-none');
        inAccount.classList.remove('d-none');
        linkProducts.classList.remove('d-none');
        linkChat.classList.remove('d-none');
    }, 1000);
}

loadWebPage()

//Botón para Desconectarse de la sesión
signOutButton.addEventListener('click', async () => {
    const responseFetch = await fetch("http://localhost:8080/auth/sign-out", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    });
    if (responseFetch.status === 200) {
        window.location.replace("/");
    }
});

linkProducts.addEventListener('click', async () => {
    window.location.replace("/productos");
})

linkChat.addEventListener('click', async () => {
    window.location.replace("/chat");
})

function showProductsCart(data) {
    const item = document.createElement("tr")
    item.innerHTML +=
        `<td>${data.title}</td>
        <td>${data.price}</td>
        <td>
          <img src=${data.thumbnail} alt="imagen ${data.title}" width="100px" />
        </td>
        <td>${data.quantity}</td>
        <td>
            <button id='deleteProduct${data._id}' onclick="deleteProductCart('${data._id}')" class='btn btn-outline-danger'>X</button>
        </td>`;
    cartProducts.appendChild(item);
}

async function deleteProductCart(product_id) {
    const userLog = await fetch("http://localhost:8080/users/me");
    const user = await userLog.json();
    const cartLog = await fetch(`http://localhost:8080/carrito/${user.email}`);
    const cart = await cartLog.json();
    let responseFetch = await fetch(`http://localhost:8080/carrito/${cart._id}/${product_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });
    if (responseFetch.status === 200) {
        const cartLog = await fetch(`http://localhost:8080/carrito/${user.email}`);
        const cart = await cartLog.json();
        if (!cart.products.length) {
            deleteCart(cart._id);
            window.location.replace("/productos");
        } else {
            console.log(`se borra el producto con id ${product_id}`);
            cartProducts.innerHTML = "<tr><th>Nombre</th><th>Precio [$]</th><th>Imagen</th><th>Cantidad</th><th style='color:gray'>Eliminar Producto</th></tr>";
            cart.products.forEach((prod) => {
                showProductsCart(prod);
            });
            addExtrasCart();
        }
    }
}

async function deleteCart(cart_id) {
    let responseFetch = await fetch(`http://localhost:8080/carrito/${cart_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });
    if (responseFetch.status === 200) {
        window.location.replace("/productos");
    }
}

cartButton.addEventListener('click', async () => {
    window.location.replace("/carrito");
});

async function buyCart(cart_id, user_id) {
    const userLog = await fetch("http://localhost:8080/users/me");
    const user = await userLog.json();
    const cartLog = await fetch(`http://localhost:8080/carrito/${user.email}`);
    const cart = await cartLog.json();
    let message = '';
    await cart.products.forEach((prod) => {
        message += `<p>Producto: ${prod.title} | Cantidad: ${prod.quantity}</p>`;
    });
    const messageObject = { message };
    const dataJSON = JSON.stringify(messageObject);
    messageCart.innerText = 'Procesando compra...';
    let responseFetch = await fetch(`http://localhost:8080/carrito/${cart_id}/${user_id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'POST',
        body: dataJSON
    });
    if (responseFetch.status === 200) {
        const buyedOrder = {
            timestamp: new Date(),
            products: cart.products
        }
        const orderJSON = JSON.stringify(buyedOrder);
        await fetch(`http://localhost:8080/carrito/order/new/${cart_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataJSON.length
            },
            method: 'POST',
            body: orderJSON
        });
        console.log('Borrando Carrito por compra exitosa');
        messageCart.innerText = 'Gracias por tu compra! Sigue viendo el catálogo de nuestros productos';
        setTimeout(async () => {
            await deleteCart(cart_id);
        }, 3000);
    }

}