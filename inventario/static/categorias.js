document.addEventListener("DOMContentLoaded", function () {
  //abrir modal agregar categoría
  const abrirModal = document.getElementById("abrir_modal");

  abrirModal.addEventListener("click", function () {
    document.getElementById("modal-agregar").style.display = "flex";
  });

  //procesa botones de actualizar categorías
  var updateButtons = document.querySelectorAll(".table_update_button");

  updateButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var row = this.closest("tr");
      var id = parseInt(row.getAttribute("data-registro-id"));
      var nombre = row.querySelector("td:first-child").textContent.trim();

      var idInput = document.querySelector(
        '#form_actualizar_categoria input[name="id"]'
      );
      var nombreInput = document.querySelector(
        '#form_actualizar_categoria input[name="nombre"]'
      );

      idInput.setAttribute("value", id);
      nombreInput.setAttribute("value", nombre);

      document.getElementById("modal_actualizar").style.display = "flex";
    });
  });

  //modal confirmación eliminar categoría
  const modalConfirmacion = document.getElementById("modal_confirmacion");
  const confirmarEliminacionBtn = document.getElementById(
    "confirmar_eliminacion_btn"
  );
  const eliminarBtns = document.querySelectorAll(".table_delete_button");

  eliminarBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var row = this.closest("tr");
      var registroId = row.getAttribute("data-registro-id");
      const eliminarForm = document.getElementById(
        "eliminar-form-" + registroId
      );

      modalConfirmacion.style.display = "flex";

      confirmarEliminacionBtn.onclick = function () {
        eliminarForm.submit();
        modalConfirmacion.style.display = "none";
      };
    });
  });

  //filtrar tabla de categorías
  const buscarCategoriaInput = document.getElementById(
    "buscar_categoria_input"
  );
  const limpiarBtn = document.getElementById("boton_limpiar_busqueda");
  const filasTabla = document.querySelectorAll("tbody tr");

  function filtrarTabla() {
    const filtro = buscarCategoriaInput.value.toLowerCase();

    filasTabla.forEach(function (fila) {
      const textoFila = fila
        .querySelector("td:first-child")
        .textContent.toLowerCase();

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
