async function deleteUserPanel(_id) {
    if (confirm('¡Estás seguro que deseas eliminar este usuario?')) {
      try {
        const response = await fetch(`/users/${_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          location.reload();
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error('Error de red:', error);
        alert('Se produjo un error en la solicitud.');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const deleteInactiveBtn = document.getElementById('deleteInactiveBtn');
    deleteInactiveBtn.addEventListener('click', deleteInactiveUsersPanel);
  });

async function deleteInactiveUsersPanel() {
  if (confirm('¡Estás seguro que deseas eliminar estos usuarios inactivos?')) {
    try {
      console.log("Eliminando usuarios inactivos...");
      const response = await fetch('/users/inactive/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer <token>', 
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        console.log(data.totalDeletedUsers);
        alert("Usuarios inactivos eliminados: " + data.totalDeletedUsers);
        location.reload();
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Se produjo un error en la solicitud.');
    }
  }
}