const linkProducts = document.getElementById('products-link-button');
const linkChat = document.getElementById('chat-link-button');
const outAccount = document.getElementById('out-account');
const selectSignInButton = document.getElementById('nav-signin');
const selectSignUpButton = document.getElementById('nav-signup');
const inAccount = document.getElementById('in-account');
const cartButton = document.getElementById('nav-cart');
const signOutButton = document.getElementById('nav-signout');
const loading = document.getElementById('loading-icon');
const signinDiv = document.getElementById('signin-div');
const signinForm = document.getElementById('signin-form');
const emailSignin = document.getElementById('inputEmail');
const passwordSignin = document.getElementById('inputPassword');
const signupDiv = document.getElementById('signup-div');
const signupForm = document.getElementById('signup-form');
const nameSignup = document.getElementById('inputName');
const lastnameSignup = document.getElementById('inputLastname');
const phoneSignup = document.getElementById('inputPhone');
const emailSignup = document.getElementById('inputEmail1');
const passwordSignup = document.getElementById('inputPassword1');
const passwordToCompare = document.getElementById('inputPassword2');
const errorMessage = document.getElementById('text-error-register');

async function loadWebPage() {
    const userLog = await fetch("http://localhost:8080/users/me");
    loading.classList.remove('d-none');
    if (userLog.status === 200) {
        setTimeout(() => {
            loading.classList.add('d-none');
            signinDiv.classList.add('d-none');
            signupDiv.classList.add('d-none');
            outAccount.classList.add('d-none');
            inAccount.classList.remove('d-none');
            linkProducts.classList.remove('d-none');
            linkChat.classList.remove('d-none');
        }, 1000);
    }
    else {
        setTimeout(() => {
            loading.classList.add('d-none');
            signinDiv.classList.remove('d-none');
            signupDiv.classList.add('d-none');
            outAccount.classList.remove('d-none');
            inAccount.classList.add('d-none');
            linkProducts.classList.add('d-none');
            linkChat.classList.add('d-none');
        }, 1000);
    }
}

loadWebPage()

selectSignInButton.addEventListener('click', async () => {
    signinDiv.classList.remove('d-none');
    signupDiv.classList.add('d-none');
})

selectSignUpButton.addEventListener('click', async () => {
    signupDiv.classList.remove('d-none');
    signinDiv.classList.add('d-none');
})

signinForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
        email: emailSignin.value,
        password: passwordSignin.value
    };
    const dataJSON = JSON.stringify(data);
    let responseFetch = await fetch("http://localhost:8080/auth/sign-in", {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'POST',
        body: dataJSON
    });
    if (responseFetch.status === 200) {
        window.location.replace("/productos");
    }
    else {
        signinDiv.classList.add('d-none');
    }
    emailSignin.value = '';
    passwordSignin.value = '';
});
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (passwordSignup.value === passwordToCompare.value) {
        errorMessage.innerHTML = '<h5>Procesando registro...</h5>';
        const data = {
            email: emailSignup.value,
            password: passwordSignup.value,
            fullname: `${nameSignup.value} ${lastnameSignup.value}`,
            phone: phoneSignup.value,
        };
        const dataJSON = JSON.stringify(data);
        let responseFetch = await fetch("http://localhost:8080/auth/sign-up", {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataJSON.length
            },
            method: 'POST',
            body: dataJSON
        });
        if (responseFetch.status === 200) {
            errorMessage.innerHTML = '<h5 style="color:green">Registro exitoso</h5>';
            await responseFetch.json();
            setTimeout(() => {
                signupDiv.classList.add('d-none');
                signinDiv.classList.remove('d-none');
            }, 1000);
        }
        else {
            signupDiv.classList.add('d-none');
        }
        setTimeout(() => {
            nameSignup.value = '';
            lastnameSignup.value = '';
            phoneSignup.value = '';
            emailSignup.value = '';
            passwordSignup.value = '';
            passwordToCompare.value = '';
            errorMessage.innerHTML = '';
        }, 1000);
    } else {
        errorMessage.innerHTML = `<h5 style="color:red">Las contraseñas no coinciden<h5>`;
        setTimeout(() => {
            errorMessage.innerHTML = '';
        }, 2000)
    }
});
