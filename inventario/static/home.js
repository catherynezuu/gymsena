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
