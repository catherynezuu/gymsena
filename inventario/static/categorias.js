document.addEventListener("DOMContentLoaded", function () {
  const abrirModal = document.getElementById("abrir_modal");
  const modalAgregar = document.getElementById("modal-agregar");
  const updateButtons = document.querySelectorAll(".table_update_button");
  const modalActualizar = document.getElementById("modal_actualizar");
  const modalConfirmacion = document.getElementById("modal_confirmacion");
  const confirmarEliminacionBtn = document.getElementById("confirmar_eliminacion_btn");
  const eliminarBtns = document.querySelectorAll(".table_delete_button");
  const buscarCategoriaInput = document.getElementById("buscar_categoria_input");
  const limpiarBtn = document.getElementById("boton_limpiar_busqueda");
  const filasTabla = document.querySelectorAll("tbody tr");

  // Función para abrir el modal de agregar categoría
  abrirModal.addEventListener("click", function () {
    modalAgregar.style.display = "flex";
  });

  // Función para procesar botones de actualizar categorías
  updateButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      const id = parseInt(row.getAttribute("data-registro-id"));
      const nombre = row.querySelector("td:first-child").textContent.trim();
      const idInput = document.querySelector('#form_actualizar_categoria input[name="id"]');
      const nombreInput = document.querySelector('#form_actualizar_categoria input[name="nombre"]');

      idInput.setAttribute("value", id);
      nombreInput.setAttribute("value", nombre);

      modalActualizar.style.display = "flex";
    });
  });

  // Función para mostrar modal de confirmación antes de eliminar una categoría
  eliminarBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const row = this.closest("tr");
      const registroId = row.getAttribute("data-registro-id");
      const eliminarForm = document.getElementById("eliminar-form-" + registroId);

      modalConfirmacion.style.display = "flex";

      confirmarEliminacionBtn.onclick = function () {
        eliminarForm.submit();
        modalConfirmacion.style.display = "none";
      };
    });
  });

  // Función para filtrar la tabla de categorías
  function filtrarTabla() {
    const filtro = buscarCategoriaInput.value.toLowerCase();

    filasTabla.forEach(function (fila) {
      const textoFila = fila.querySelector("td:first-child").textContent.toLowerCase();

      if (textoFila.includes(filtro)) {
        fila.style.display = "";
      } else {
        fila.style.display = "none";
      }
    });
  }

  buscarCategoriaInput.addEventListener("input", filtrarTabla);

  limpiarBtn.addEventListener("click", function () {
    buscarCategoriaInput.value = "";
    filtrarTabla();
  });
});

