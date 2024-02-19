document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('modalAgregarCategoria');
    var abrirModal = document.getElementById('abrirModalAgregarCategoria');
    var cerrarModal = document.getElementsByClassName('close')[0];

    abrirModal.onclick = function() {
        modal.style.display = 'block';
    }

    cerrarModal.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    function ShowAlert(){
        ShowAlert("Alerta");
    }
});
