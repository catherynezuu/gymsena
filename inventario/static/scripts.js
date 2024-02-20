document.addEventListener('DOMContentLoaded', function() {
    var modal = document.querySelector(".modal");
    var abrirModal = document.getElementById('abrir_modal');
    var cerrarModal = document.getElementsByClassName('close')[0];

    abrirModal.onclick = function() {
        modal.style.display = 'flex';
    }

    cerrarModal.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
