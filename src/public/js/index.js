const linkProducts = document.getElementById('products-link-button');
const linkChat = document.getElementById('chat-link-button');
const inputSearch= document.getElementById('input-search');
const outAccount = document.getElementById('out-account');
const selectSignInButton = document.getElementById('nav-signin');
const selectSignUpButton = document.getElementById('nav-signup');
const inAccount = document.getElementById('in-account');
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
const forgotPasswordButton = document.getElementById("forgot-password-button");
const forgotPasswordForm = document.getElementById("forgot-password-form");
const forgotPasswordFormInner = document.getElementById('forgot-password-form-inner');


async function loadWebPage() {
    const userLog = await fetch("/users/me");
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
            inputSearch.classList.remove('d-none')
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
            inputSearch.classList.add('d-none');
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
    const responseFetch = await fetch("/auth/sign-in", {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (responseFetch.status === 200) {
      window.location.replace("/productos");
    }
    else if (responseFetch.status === 401) {
      const errorDiv = document.createElement('div');
      errorDiv.classList.add('alert', 'alert-danger');
      errorDiv.textContent = 'El usuario o la contraseña son incorrectos.';
      signinForm.appendChild(errorDiv);
    }
    else {
      signinDiv.classList.add('d-none');
    }
    emailSignin.value = '';
    passwordSignin.value = '';
});

  

function isString(value) {
    return typeof value === 'string';
}


function isEmail(value) {
    
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value);
}


function hasMinLength(value, minLength) {
    return value.length >= minLength;
}


function validateForm() {
    let isValid = true;
    if (!isString(nameSignup.value) || !hasMinLength(nameSignup.value, 1)) {
        errorMessage.innerHTML = '<h5 style="color:red">Nombre inválido</h5>';
        isValid = false;
    } else if (!isString(lastnameSignup.value) || !hasMinLength(lastnameSignup.value, 1)) {
        errorMessage.innerHTML = '<h5 style="color:red">Apellido inválido</h5>';
        isValid = false;
    } else if (!isEmail(emailSignup.value)) {
        errorMessage.innerHTML = '<h5 style="color:red">Email inválido</h5>';
        isValid = false;
    } else if (!hasMinLength(passwordSignup.value, 8)) {
        errorMessage.innerHTML = '<h5 style="color:red">Contraseña inválida. Debe tener al menos 8 caracteres.</h5>';
        isValid = false;
    } else if (passwordSignup.value !== passwordToCompare.value) {
        errorMessage.innerHTML = '<h5 style="color:red">Las contraseñas no coinciden</h5>';
        isValid = false;
    }
    return isValid;
}


signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (validateForm()) {
        errorMessage.innerHTML = '<h5>Procesando registro...</h5>';
        const data = {
            email: emailSignup.value,
            password: passwordSignup.value,
            fullname: `${nameSignup.value} ${lastnameSignup.value}`,
            phone: phoneSignup.value,
        };
        const dataJSON = JSON.stringify(data);
        let responseFetch = await fetch("/auth/sign-up", {
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
    }
});

forgotPasswordButton.addEventListener("click", function() {
    forgotPasswordForm.classList.remove("d-none"); 
    signinDiv.classList.add("d-none"); 
    signupDiv.classList.add("d-none"); 
  });

  forgotPasswordFormInner.addEventListener('submit', (event) => {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();
  
    // Obtener los valores de los campos del formulario
    const email = document.getElementById('inputEmail2').value;
  
    // Enviar los valores al backend utilizando fetch
    fetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Mostrar un mensaje de éxito al usuario
        alert('Se ha enviado un correo electrónico con las instrucciones para recuperar su contraseña');
      } else {
        // Mostrar un mensaje de error al usuario
        alert('No se pudo enviar el correo electrónico de recuperación de contraseña');
      }
    })
    .catch(error => {
      // Mostrar un mensaje de error al usuario
      alert('Ha ocurrido un error: ' + error);
    });
  });