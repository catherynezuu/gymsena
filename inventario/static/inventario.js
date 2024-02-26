document.addEventListener("DOMContentLoaded", function () {
  const abrirModal = document.getElementById("abrir_modal");

  abrirModal.addEventListener("click", function () {
    document.getElementById("modal-agregar").style.display = "flex";
  });

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

  var updateButtons = document.querySelectorAll(".table_update_button");

  updateButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      const id = parseInt(row.getAttribute("data-registro-id"));
      const nombre = row.querySelector("td:first-child").textContent.trim();
      const codigo = parseInt(row.querySelector("td:nth-child(2)").textContent);
      const categoria = parseInt(row.getAttribute("data-categoria-id"));

      const idInput = document.querySelector(
        '#form_actualizar_inventario input[name="id"]'
      );
      const nombreInput = document.querySelector(
        '#form_actualizar_inventario input[name="nombre"]'
      );
      const codigoInput = document.querySelector(
        '#form_actualizar_inventario input[name="codigo"]'
      );
      const selectInput = document.querySelector(
        '#form_actualizar_inventario select[name="categoria"]'
      );
      console.log(selectInput);

      idInput.setAttribute("value", id);
      nombreInput.setAttribute("value", nombre);
      codigoInput.setAttribute("value", codigo);
      selectInput.value = categoria;

      document.getElementById("modal_actualizar").style.display = "flex";
    });
  });

  const buscarInventarioInput = document.getElementById(
    "buscar_inventario_input"
  );
  const limpiarBtn = document.getElementById("boton_limpiar_busqueda");
  const filasTabla = document.querySelectorAll("tbody tr");

  function filtrarTabla() {
    var filtro = buscarInventarioInput.value.toLowerCase();
    filasTabla.forEach(function (fila) {
      const textoFila = fila
        .querySelector("td:first-child")
        .textContent.toLowerCase();
      const codigoFila = fila.querySelector("td:nth-child(2)").textContent;
      const categoriaFila = fila
        .querySelector("td:nth-child(3)")
        .textContent.toLocaleLowerCase();

      if (
        textoFila.includes(filtro) ||
        codigoFila.includes(filtro) ||
        categoriaFila.includes(filtro)
      ) {
        fila.style.display = "";
      } else {
        fila.style.display = "none";
      }
    });
  }

  buscarInventarioInput.addEventListener("input", filtrarTabla);

  limpiarBtn.addEventListener("click", function () {
    buscarInventarioInput.value = "";
    filtrarTabla();
  });
});
