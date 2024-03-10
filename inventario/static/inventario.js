document.addEventListener("DOMContentLoaded", function () {
  const abrirModal = document.getElementById("abrir_modal");
  const modalAgregar = document.getElementById("modal-agregar");
  const modalConfirmacion = document.getElementById("modal_confirmacion");
  const confirmarEliminacionBtn = document.getElementById(
    "confirmar_eliminacion_btn"
  );
  const eliminarBtns = document.querySelectorAll(".table_delete_button");
  const updateButtons = document.querySelectorAll(".table_update_button");
  const modalActualizar = document.getElementById("modal_actualizar");
  const buscarInventarioInput = document.getElementById(
    "buscar_inventario_input"
  );
  const limpiarBtn = document.getElementById("boton_limpiar_busqueda");
  const filasTabla = document.querySelectorAll("tbody tr");

  // Función para abrir el modal de agregar elemento
  abrirModal.addEventListener("click", function () {
    modalAgregar.style.display = "flex";
  });

  // Función para mostrar modal de confirmación antes de eliminar un elemento
  eliminarBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const row = this.closest("tr");
      const registroId = row.getAttribute("data-registro-id");
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

  // Función para procesar botones de actualizar elementos
  updateButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const row = this.closest("tr");
      const id = parseInt(row.getAttribute("data-registro-id"));
      const nombre = row.querySelector("td:first-child").textContent.trim();
      const codigo = parseInt(row.querySelector("td:nth-child(2)").textContent);
      const categoria = parseInt(row.getAttribute("data-categoria-id"));
      const stock = parseInt(row.querySelector(":nth-child(4)").textContent);

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
      const stockInput = document.querySelector(
        '#form_actualizar_inventario input[name="stock"]'
      );

      idInput.value = id;
      nombreInput.value = nombre;
      codigoInput.value = codigo;
      selectInput.value = categoria;
      stockInput.value = stock;

      modalActualizar.style.display = "flex";
    });
  });

  // Función para filtrar la tabla de inventario
  function filtrarTabla() {
    const filtro = buscarInventarioInput.value.toLowerCase();

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
