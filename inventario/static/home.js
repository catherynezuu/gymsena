document.addEventListener("DOMContentLoaded", function () {
  const botonAgregarUsuario = document.getElementById("abrir_modal_usuario");

  botonAgregarUsuario.addEventListener("click", function () {
    const modal_agrgar_usuario = document.getElementById("home_modal");

    modal_agrgar_usuario.style.display = "flex";
  });

  const buscarCategoriaInput = document.getElementById("buscar_home_input");
  const limpiarBtn = document.getElementById("boton_limpiar_busqueda");
  const filasTabla = document.querySelectorAll("tbody tr");

  function filtrarTabla() {
    const filtro = buscarCategoriaInput.value.toLowerCase();

    filasTabla.forEach(function (fila) {
      const textoFila = fila
        .querySelector("td:first-child")
        .textContent.toLowerCase();
      const codigoFila = fila.querySelector("td:nth-child(2)").textContent;
      const categoriaFila = fila
        .querySelector("td:nth-child(3)")
        .textContent.toLowerCase();

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

  buscarCategoriaInput.addEventListener("input", filtrarTabla);

  limpiarBtn.addEventListener("click", function () {
    buscarCategoriaInput.value = "";
    filtrarTabla();
  });


  const btnSwitchPrestamos = document.getElementById("switch_prestamos");
  btnSwitchPrestamos.classList.add('button_switch_active')

  const btnSwitchDevoluciones = document.getElementById("switch_devoluciones");
  btnSwitchDevoluciones.classList.add('button_switch_deactive')

  const formPrestamos = document.getElementById("prestamos_form");
  const formDevoluciones = document.getElementById("devoluciones_form");

  btnSwitchPrestamos.addEventListener('click', function(){
      formPrestamos.style.display = 'grid';
      formDevoluciones.style.display = 'none';

      btnSwitchPrestamos.classList.remove('button_switch_deactive')
      btnSwitchPrestamos.classList.add('button_switch_active')

      btnSwitchDevoluciones.classList.remove('button_switch_active')
      btnSwitchDevoluciones.classList.add('button_switch_deactive')
  })

  btnSwitchDevoluciones.addEventListener('click', function(){
    formPrestamos.style.display = 'none';
    formDevoluciones.style.display = 'grid';

    btnSwitchPrestamos.classList.remove('button_switch_active')
    btnSwitchPrestamos.classList.add('button_switch_deactive')

    btnSwitchDevoluciones.classList.remove('button_switch_deactive')
    btnSwitchDevoluciones.classList.add('button_switch_active')
  })
});
