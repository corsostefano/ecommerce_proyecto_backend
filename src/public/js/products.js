const linkProducts = document.getElementById('products-link-button');
const linkChat = document.getElementById('chat-link-button');
const outAccount = document.getElementById('out-account');
const selectSignInButton = document.getElementById('nav-signin');
const selectSignUpButton = document.getElementById('nav-signup');
const inAccount = document.getElementById('in-account');
const cartButton = document.getElementById('nav-cart');
const signOutButton = document.getElementById('nav-signout');
const loading = document.getElementById('loading-icon');

async function loadWebPage() {
    const userLog = await fetch("http://localhost:8080/users/me");
    const user = await userLog.json();
    const cartLog = await fetch(`http://localhost:8080/carrito/${user.email}`);
    const cart = await cartLog.json();
    loading.classList.remove('d-none');
    setTimeout(async () => {
        loading.classList.add('d-none');
        outAccount.classList.add('d-none');
        inAccount.classList.remove('d-none');
        linkProducts.classList.remove('d-none');
        linkChat.classList.remove('d-none');
        if (!cart) {
            cartButton.classList.add('d-none');
        } else {
            cartButton.classList.remove('d-none');
        }
    }, 1000);
}

loadWebPage()

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
});


linkChat.addEventListener('click', async () => {
    window.location.replace("/chat");
});


const productsTable = document.getElementById('products-table');
const tableProducts = document.getElementById("tableProducts");


async function addProductToCart(id) {
    const userLog = await fetch("http://localhost:8080/users/me");
    const user = await userLog.json();
    const cartLog = await fetch(`http://localhost:8080/carrito/${user.email}`);
    const cart = await cartLog.json();
    const productToAddLog = await fetch(`http://localhost:8080/productos/${id}`);
    let productToAdd = await productToAddLog.json();
    if (!cart) {
        productToAdd = { ...productToAdd, quantity: 1 };
        const emailUser = { email: user.email };
        const emailUserJSON = JSON.stringify(emailUser);
        let responseFetch = await fetch("http://localhost:8080/carrito", {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': emailUserJSON.length
            },
            method: 'POST',
            body: emailUserJSON
        });
        const newCart = await responseFetch.json();
        alert(`Se crea nuevo carrito con el Id: ${newCart}`);
        const dataJSON = JSON.stringify(productToAdd);
        let addProductFetch = await fetch(`http://localhost:8080/carrito/${newCart}`, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataJSON.length
            },
            method: 'POST',
            body: dataJSON
        });
        if (addProductFetch.status === 200) {
            cartButton.classList.remove('d-none');
        }
    } else {
        let productIndex = cart.products.findIndex(prod => prod._id === productToAdd._id);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
            productToAdd = cart.products[productIndex];
            const dataJSON = JSON.stringify(productToAdd);
            await fetch(`http://localhost:8080/carrito/${cart._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': dataJSON.length
                },
                method: 'PUT',
                body: dataJSON
            });
        } else {
            productToAdd.quantity = 1;
            const dataJSON = JSON.stringify(productToAdd);
            await fetch(`http://localhost:8080/carrito/${cart._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': dataJSON.length
                },
                method: 'POST',
                body: dataJSON
            });
        }
        
        alert(`Nuevo producto '${productToAdd.title}' agregado al carrito`);

    }
}

cartButton.addEventListener('click', async () => {
    window.location.replace("/carrito");
});