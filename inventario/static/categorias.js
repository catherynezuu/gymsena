document.addEventListener("DOMContentLoaded", function () {
  const abrirModal = document.getElementById("abrir_modal");

  abrirModal.addEventListener('click', function(){
    document.getElementById('modal-agregar').style.display = "flex";
  })

  var updateButtons = document.querySelectorAll(".table_update_button");

  updateButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var row = this.closest('tr');
      var id = parseInt(row.getAttribute("data-registro-id"));
      var nombre = row.querySelector('td:first-child').textContent.trim();

      var idInput = document.querySelector('#form_actualizar_categoria input[name="id"]');
      var nombreInput = document.querySelector('#form_actualizar_categoria input[name="nombre"]');

      idInput.setAttribute('value', id);
      nombreInput.setAttribute('value', nombre);

      document.getElementById("modal-actualizar").style.display = "flex";
    });
  });

  const modalConfirmacion = document.getElementById("modal-confirmacion");
  const confirmarEliminacionBtn = document.getElementById(
    "confirmar-eliminacion-btn"
  );
  const eliminarBtns = document.querySelectorAll(".table_delete_button");

  eliminarBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var row = this.closest('tr');
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
});

