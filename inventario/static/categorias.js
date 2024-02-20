$(document).ready(function () {

  let modal_form = $("#form_agregar_categoria");

  modal_form.submit(function (e) {
    e.preventDefault();
    AddCategory();
  });

  function AddCategory() {
    let data_string = modal_form.serialize();
    $.ajax({
      type: "POST",
      url: agregarCategoriaURL,
      data: data_string,
      success: function (response) {
        if (response.success) {
          alert(response.message);
          location.reload();
        } else {
          alert(response.message);
        }
      },
      error: function (xhr, errmsg, err) {
        console.log(xhr.status + ": " + xhr.responseText);
        alert(errmsg);
      },
    });
  }


  const modalConfirmacion = document.getElementById('modal-confirmacion')
  const confirmarEliminacionBtn = document.getElementById('confirmar-eliminacion-btn')
  const eliminarBtns = document.querySelectorAll('.table_delete_button')

  eliminarBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      const registroId = this.getAttribute('data-registro-id')
      const eliminarForm = document.getElementById('eliminar-form-' + registroId)

      modalConfirmacion.style.display = 'flex'

      confirmarEliminacionBtn.onclick = function(){
        eliminarForm.submit();
        modalConfirmacion.style.display = 'none'
      };
    })
  })
});
