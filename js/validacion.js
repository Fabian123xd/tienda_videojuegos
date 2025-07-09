document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('formContacto');
  const estado = document.getElementById('estadoFormulario');
  const tabla = document.createElement('table');

  tabla.classList.add('tabla-Productos');
  tabla.innerHTML = `
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Teléfono</th>
        <th>Mensaje</th>
      </tr>
    </thead>
    <tbody id="tablaDatos"></tbody>
  `;

  formulario.insertAdjacentElement('afterend', tabla);

  mostrarMensajes();

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !email || !mensaje) {
      estado.textContent = 'Por favor completa todos los campos requeridos.';
      estado.style.color = 'red';
      return;
    }

    const nuevo = { nombre, email, telefono, mensaje };

    let mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
    mensajes.push(nuevo);
    localStorage.setItem('mensajes', JSON.stringify(mensajes));
    console.log("Formulario enviado:", mensajes);
    estado.textContent = 'Mensaje enviado correctamente.';
    estado.style.color = 'lightgreen';

    formulario.reset();
    mostrarMensajes();
  });

  function mostrarMensajes() {
    const datos = JSON.parse(localStorage.getItem('mensajes')) || [];
    const cuerpo = document.getElementById('tablaDatos');
    cuerpo.innerHTML = '';

    datos.forEach(m => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${m.nombre}</td>
        <td>${m.email}</td>
        <td>${m.telefono}</td>
        <td>${m.mensaje}</td>
      `;
      cuerpo.appendChild(fila);
    });
  }
});
  const btnBorrar = document.getElementById('borrarMensajes');
  btnBorrar.addEventListener('click', function () {
    if (confirm('¿Estás seguro de borrar todos los mensajes?')) {
      localStorage.removeItem('mensajes');
      mostrarMensajes();
      estado.textContent = 'Todos los mensajes han sido borrados.';
      estado.style.color = 'orange';
    }
  });
