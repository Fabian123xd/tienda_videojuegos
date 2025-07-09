document.addEventListener("DOMContentLoaded", () => {
  const productos = [
    {
      id: 1,
      nombre: "GTA San Andreas",
      precio: 30,
      plataforma: "PS2/PC",
      imagen: "img/200472123346_1.jpg",
      descripcion: "Mundo abierto ambientado en San Andreas. Vive la historia de CJ entre pandillas, crimen y acción en los años 90."
    },
    {
      id: 2,
      nombre: "God Of War 2",
      precio: 40,
      plataforma: "PS2",
      imagen: "img/Gow2.jpg",
      descripcion: "Kratos contra los dioses en una épica aventura mitológica. Combates intensos, narrativa cinematográfica y acción."
    },
    {
      id: 3,
      nombre: "The Last of Us",
      precio: 60,
      plataforma: "PS3/PS4/PS5",
      imagen: "img/The_Last_of_Us_Part_I_cover.jpg",
      descripcion: "Joel y Ellie luchan por sobrevivir en un mundo devastado por una infección. Emotiva historia y sigilo brutal."
    },
    {
      id: 4,
      nombre: "FIFA 25",
      precio: 59.99,
      plataforma: "PS5",
      imagen: "img/fifa25.jpg",
      descripcion: "Simulador de fútbol con IA avanzada, gráficos realistas y modos de juego competitivos."
    },
    {
      id: 5,
      nombre: "Age of Empires 3",
      precio: 19.99,
      plataforma: "PC",
      imagen: "img/Age3.jpg",
      descripcion: "Estrategia en tiempo real en la era de la colonización. Recolecta recursos y domina imperios."
    },
    {
      id: 6,
      nombre: "GTA IV",
      precio: 20,
      plataforma: "PS3",
      imagen: "img/gta iv.jpg",
      descripcion: "Acción criminal en Liberty City. Juega como Niko Bellic en una historia de crimen y redención."
    },
    {
      id: 7,
      nombre: "Dragon Ball Xenoverse 2",
      precio: 15,
      plataforma: "PS4",
      imagen: "img/dbxv2_game-thumbnail.jpg",
      descripcion: "Viaja en el tiempo, crea tu personaje y lucha junto a Goku y compañía."
    },
    {
      id: 8,
      nombre: "Call of Duty: Black Ops 6",
      precio: 70,
      plataforma: "PS5/PC",
      imagen: "img/Blackops6.jpg",
      descripcion: "Misiones encubiertas, combate moderno y acción intensa en todo el mundo."
    },
    {
      id: 9,
      nombre: "GTA VI",
      precio: 79.99,
      plataforma: "PS5",
      imagen: "img/gta-6-launch-will-also-be-positive-for-ubisoft-ceo-says_rmhr.jpg",
      descripcion: "La nueva era de GTA en Vice City moderna. Mundo abierto más inmersivo que nunca."
    }
  ];

  const contenedor = document.getElementById("productos");
  const filtro = document.getElementById("filtroPlataforma");
  const carritoDropdown = document.getElementById("dropdownCarrito");
  const btnCarrito = document.getElementById("btnCarrito");

  // ========= Mostrar productos =========
  function mostrarProductos(filtroValor = "Todas") {
    contenedor.innerHTML = "";
    const filtrados = filtroValor === "Todas"
      ? productos
      : productos.filter(p => p.plataforma === filtroValor);

    filtrados.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" width="150">
        <h3>${producto.nombre}</h3>
        <p>Plataforma: ${producto.plataforma}</p>
        <p>Precio: $${producto.precio}</p>
        <button class="btn-detalle" data-titulo="${producto.nombre}" data-descripcion="${producto.descripcion}">Ver más</button>
        <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
      `;
      contenedor.appendChild(div);
    });
  }

  // ========= Filtro por plataforma =========
  if (filtro) {
    filtro.innerHTML = `<option value="Todas">Todas</option>`;
    const plataformas = [...new Set(productos.map(p => p.plataforma))];
    plataformas.forEach(p => {
      filtro.innerHTML += `<option value="${p}">${p}</option>`;
    });

    filtro.addEventListener("change", () => {
      mostrarProductos(filtro.value);
    });
  }

  mostrarProductos();

  // ========= Función para actualizar cantidad =========
  function actualizarCantidadCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const spanCantidad = document.getElementById("cantidadCarrito");
    if (spanCantidad) {
      spanCantidad.textContent = carrito.length;
    }
  }

  // ========= Agregar al carrito =========
  function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!carrito.some(p => p.id === id)) {
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarCantidadCarrito();
      renderizarDropdownCarrito();
      alert(`${producto.nombre} agregado al carrito.`);
    } else {
      alert(`${producto.nombre} ya está en el carrito.`);
    }
  }

  // ========= Eliminar producto =========
  window.eliminarDelCarrito = function (index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCantidadCarrito();
    renderizarDropdownCarrito();
  }

  // ========= Mostrar/ocultar dropdown =========
  if (btnCarrito && carritoDropdown) {
    btnCarrito.addEventListener("click", () => {
      carritoDropdown.style.display = carritoDropdown.style.display === "block" ? "none" : "block";
      renderizarDropdownCarrito();
    });
  }

  // ========= Renderizar dropdown =========
  function renderizarDropdownCarrito() {
    if (!carritoDropdown) return;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoDropdown.innerHTML = "";

    if (carrito.length === 0) {
      carritoDropdown.innerHTML = "<p>Carrito vacío.</p>";
      return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
      total += item.precio;
      const p = document.createElement("p");
      p.innerHTML = `${item.nombre} - $${item.precio} 
        <button onclick="eliminarDelCarrito(${index})">❌</button>`;
      carritoDropdown.appendChild(p);
    });

    const totalP = document.createElement("p");
    totalP.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    carritoDropdown.appendChild(totalP);
  }

  // ========= Abrir modal =========
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-agregar")) {
      const id = parseInt(e.target.dataset.id);
      agregarAlCarrito(id);
    }

    if (e.target.classList.contains("btn-detalle")) {
      document.getElementById("modalTitulo").textContent = e.target.dataset.titulo;
      document.getElementById("modalDescripcion").textContent = e.target.dataset.descripcion;
      document.getElementById("modalProducto").style.display = "block";
      mostrarReseñas(e.target.dataset.titulo); // después de abrir el modal
    }
  });
  // ========== Mostrar reseñas dentro del modal ==========
function mostrarReseñas(nombreJuego) {
  const contenedor = document.getElementById("contenedorReseñas");
  const reseñas = JSON.parse(localStorage.getItem("reseñas_" + nombreJuego)) || [];

  if (reseñas.length === 0) {
    contenedor.innerHTML = "<p>No hay reseñas aún. ¡Sé el primero en comentar!</p>";
    return;
  }

  contenedor.innerHTML = reseñas.map(r => `
    <div class="reseña">
      <p><strong>${"⭐".repeat(r.estrellas)}</strong></p>
      <p>${r.comentario}</p>
    </div>
  `).join("");
}

  // ========= Cerrar modal =========
  const cerrarModal = document.querySelector(".cerrar");
  if (cerrarModal) {
    cerrarModal.addEventListener("click", () => {
      document.getElementById("modalProducto").style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target.id === "modalProducto") {
      document.getElementById("modalProducto").style.display = "none";
    }
  });
  document.getElementById("guardarReseña").addEventListener("click", () => {
  const nombreJuego = document.getElementById("modalTitulo").textContent;
  const estrellas = parseInt(document.getElementById("estrellas").value);
  const comentario = document.getElementById("comentario").value;

  if (comentario.trim() === "") {
    alert("Por favor escribe un comentario.");
    return;
  }

  const nueva = { estrellas, comentario };
  const reseñas = JSON.parse(localStorage.getItem("reseñas_" + nombreJuego)) || [];
  reseñas.push(nueva);
  localStorage.setItem("reseñas_" + nombreJuego, JSON.stringify(reseñas));
  document.getElementById("comentario").value = "";
  mostrarReseñas(nombreJuego);
});

  // Inicializa el contador
  actualizarCantidadCarrito();
});
