const socket = io();

//NAVBAR
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
    loading.classList.remove('d-none');
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

//Boton para linkear a la vista de productos
linkProducts.addEventListener('click', async () => {
    window.location.replace("/productos");
});

//Boton para linkear a la vista de chat
linkChat.addEventListener('click', async () => {
    window.location.replace("/chat");
});

//CENTRO DE MENSAJES - CHAT
const message = document.getElementById("messages");
const formChat = document.getElementById("form");
const inputMessage = document.getElementById("msg_input");

function showMessage(data) {
  message.innerHTML = '';
  data.messages.forEach(msg => {
    const item = document.createElement("li");
    item.className = "list-group-item text-start";
    item.innerHTML =
      `<strong style="color: blue">${msg.email}</strong> <font color="brown">${msg.timestamp}</font> : <i style="color: green">${msg.content}</i>`;
    message.appendChild(item);
  })
}

formChat.addEventListener("submit", async function (e) {
  e.preventDefault()
  const userLog = await fetch("http://localhost:8080/users/me");
  const user = await userLog.json();
  const data = {
    author: {
      email: user.email,
      name: user.fullname,
    },
    content: inputMessage.value,
    timestamp: new Date().toLocaleString()
  };
  socket.emit("chat message", data);
  inputMessage.value = "";
  inputMessage.focus();
});

socket.on("connect", () => {
  console.log("Conectados al servidor");
});

socket.on("history-messages", (data) => {
  showMessage(data);
});

socket.on("notification", (data) => {
  showMessage(data);
});