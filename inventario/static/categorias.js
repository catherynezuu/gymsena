$(document).ready(function () {
    let modal_form = $("#form_agregar_categoria");

    modal_form.submit(function (e) {
      e.preventDefault();
      AddCategory();
    });

    function AddCategory() {
      let data_string = modal_form.serialize(); // Serializa los datos del formulario
      $.ajax({
        type: "POST",
        url: "{% url 'agregar_categoria' %}",
        data: data_string,
        success: function (response) {
          if (response.success) {
            alert(response.message); // Muestra el mensaje de éxito
            location.reload(); // Recarga la página después de agregar la categoría
          } else {
            alert(response.message); // Muestra el mensaje de error
          }
        },
        error: function (xhr, errmsg, err) {
          console.log(xhr.status + ": " + xhr.responseText);
          alert("No se puede agregar, elemento ya existente");
        },
      });
    }
  });