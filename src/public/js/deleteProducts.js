async function deleteProduct(_id) {
    if (confirm('¡Estás seguro que deseas eliminar este producto?')) {
      try {
        const response = await fetch(`/productos/${_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 204) {
          alert('El producto se eliminó correctamente');
          location.reload();
        } else {
          const data = await response.json();
          alert(data.message);
          location.reload();
        }
      } catch (error) {
        console.error('Error de red:', error);
        alert('Se produjo un error en la solicitud.');
      }
    }
  }