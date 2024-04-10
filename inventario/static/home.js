document.addEventListener("DOMContentLoaded", function () {
  const botonAgregarUsuario = document.getElementById("abrir_modal_usuario");
  const modal_agrgar_usuario = document.getElementById("home_modal");
  const buscarCategoriaInput = document.getElementById("buscar_home_input");
  const limpiarBtn = document.getElementById("boton_limpiar_busqueda");
  const filasTabla = document.querySelectorAll("tbody tr");
  const btnSwitchPrestamos = document.getElementById("switch_prestamos");
  const btnSwitchDevoluciones = document.getElementById("switch_devoluciones");
  const formPrestamos = document.getElementById("prestamos_form");
  const formDevoluciones = document.getElementById("devoluciones_form");
  const cedulaInput = document.querySelector("#devoluciones_form #id_cedula_usuario");
  const codigoInventarioSelect = document.getElementById("id_codigo_inventario");

  botonAgregarUsuario.addEventListener("click", function () {
    modal_agrgar_usuario.style.display = "flex";
  });

  function filtrarTabla() {
    const filtro = buscarCategoriaInput.value.toLowerCase();

    filasTabla.forEach(function (fila) {
      const textoFila = fila.cells[0].textContent;
      const codigoFila = fila.cells[1].textContent.toLowerCase();
      const cedulaFila = fila.cells[2].textContent;
      const nombreFila = fila.cells[3].textContent.toLowerCase();

      if (
        textoFila.includes(filtro) ||
        codigoFila.includes(filtro) ||  
        cedulaFila.includes(filtro) ||
        nombreFila.includes(filtro)
      ) {
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

  function toggleForm(formToShow, formToHide, activeBtn, deactiveBtn) {
    formToShow.style.display = "grid";
    formToHide.style.display = "none";

    activeBtn.classList.remove("button_switch_deactive");
    activeBtn.classList.add("button_switch_active");

    deactiveBtn.classList.remove("button_switch_active");
    deactiveBtn.classList.add("button_switch_deactive");
  }

  btnSwitchPrestamos.addEventListener("click", function () {
    toggleForm(formPrestamos, formDevoluciones, btnSwitchPrestamos, btnSwitchDevoluciones);
  });

  btnSwitchDevoluciones.addEventListener("click", function () {
    toggleForm(formDevoluciones, formPrestamos, btnSwitchDevoluciones, btnSwitchPrestamos);
  });

  // Agregar clase inicial a los botones de switch
  btnSwitchPrestamos.classList.add("button_switch_active");
  btnSwitchDevoluciones.classList.add("button_switch_deactive");

  // Función para copiar la cédula al campo de entrada
  function copiarCedula(event) {
    const fila = event.currentTarget;
    const cedula = fila.cells[0].textContent.trim(); // Obtener el texto de la cédula de la fila clicada
    cedulaInput.value = cedula; // Copiar la cédula al campo de entrada
  }

  // Función para seleccionar el elemento en el select del formulario
  function seleccionarElemento(event) {
    const fila = event.currentTarget;
    const codigoElemento = fila.getAttribute("data-element-id"); // Obtener el código del elemento de la fila clicada
    codigoInventarioSelect.value = codigoElemento; // Seleccionar el elemento en el select del formulario
  }

  // Asignar el evento clic a cada fila de la tabla
  filasTabla.forEach(function (fila) {
    fila.addEventListener("click", function (event) {
      toggleForm(formDevoluciones, formPrestamos, btnSwitchDevoluciones, btnSwitchPrestamos);
      copiarCedula(event); // Copiar la cédula al campo de entrada
      seleccionarElemento(event); // Seleccionar el elemento en el select del formulario
    });
  });
});

