function resetPassword(event) {
  event.preventDefault();

  const form = event.target;
  const password = form.elements.newPassword.value;
  const cnfrmPassword = form.elements.cnfrmPassword.value;
  const token = form.elements.token.value;

  if (password.length === 0) {
    alert('La contraseña no puede estar vacía.');
    return;
  }

  if (password !== cnfrmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/auth/reset-password');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    const response = JSON.parse(xhr.responseText);
    if (xhr.status === 200) {
      alert(response.message);
      form.reset();
    } else if (xhr.status === 400) {
      alert(response.message);
    } else {
      alert('Ha ocurrido un error en el servidor.');
    }
  };
  xhr.onerror = function() {
    alert('Ha ocurrido un error al enviar la solicitud.');
  };
  xhr.send(JSON.stringify({ token, password }));
}
