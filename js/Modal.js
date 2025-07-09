document.addEventListener("DOMContentLoaded", function () {
  const botones = document.querySelectorAll(".btn-ver-detalle");
  const modal = document.getElementById("modalProducto");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalDescripcion = document.getElementById("modalDescripcion");
  const btnCerrar = document.querySelector(".cerrar");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const titulo = boton.dataset.titulo;
      const descripcion = boton.dataset.descripcion;

      modalTitulo.textContent = titulo;
      modalDescripcion.textContent = descripcion;

      modal.style.display = "block";
    });
  });

  btnCerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });
});

 
function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

function actualizarContadorCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contadorCarrito");
  if (contador) contador.textContent = carrito.length;
}