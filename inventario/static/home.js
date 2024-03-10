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

  botonAgregarUsuario.addEventListener("click", function () {
    modal_agrgar_usuario.style.display = "flex";
  });

  function filtrarTabla() {
    const filtro = buscarCategoriaInput.value.toLowerCase();

    filasTabla.forEach(function (fila) {
      const textoFila = fila.cells[0].textContent.toLowerCase();
      const codigoFila = fila.cells[1].textContent;
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
});
