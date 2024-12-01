document.addEventListener('DOMContentLoaded', () => {
  // Función para cargar las opciones en los combobox desde la API
  const cargarOpciones = () => {
    fetch('http://localhost:3000/api/modulos')
      .then(response => response.json())
      .then(data => {
        const moduloSelect = document.getElementById('modulo');
        data.forEach(modulo => {
          const option = document.createElement('option');
          option.value = modulo.modulo_id;
          option.textContent = modulo.nombre;
          moduloSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error al cargar los módulos:', error));

    fetch('http://localhost:3000/api/severidades')
      .then(response => response.json())
      .then(data => {
        const severidadSelect = document.getElementById('severidad');
        data.forEach(severidad => {
          const option = document.createElement('option');
          option.value = severidad.severidad_id;
          option.textContent = severidad.descripcion;
          severidadSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error al cargar las severidades:', error));

    fetch('http://localhost:3000/api/clientes')
      .then(response => response.json())
      .then(data => {
        const clienteSelect = document.getElementById('cliente');
        data.forEach(cliente => {
          const option = document.createElement('option');
          option.value = cliente.usuario_id;
          option.textContent = cliente.nombre;
          clienteSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error al cargar los clientes:', error));
  };

  // Llamar a la función para cargar las opciones cuando se cargue la página
  
  cargarOpciones();
  // Escuchar el envío del formulario
 
  document.getElementById('ticketForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const ticketData = {
      usuario_id: document.getElementById('cliente').value,
      modulo_id: document.getElementById('modulo').value,
      severidad_id: document.getElementById('severidad').value,
      prioridad_id: 1, // Puedes ajustar esto según la lógica de tu aplicación
      descripcion_breve: document.getElementById('descripcionBreve').value,
      descripcion_detallada: document.getElementById('descripcionDetallada').value
    };
    console.log(ticketData);
    fetch('http://localhost:3000/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticketData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.json();
    })
    .then(data => {
      if (data.ticketId) {
        document.getElementById('mensaje').textContent = `Ticket creado con éxito. Número de ticket: ${data.ticketId}`;
        document.getElementById('mensaje').classList.add('alert', 'alert-success');
        document.getElementById('ticketForm').reset();
      } else {
        document.getElementById('mensaje').textContent = 'Error al crear el ticket.';
        document.getElementById('mensaje').classList.add('alert', 'alert-danger');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('mensaje').textContent = 'Error al enviar la solicitud.';
      document.getElementById('mensaje').classList.add('alert', 'alert-danger');
    });
  });
});

  