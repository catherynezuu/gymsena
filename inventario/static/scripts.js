document.addEventListener("DOMContentLoaded", function () {

  //Código ocultar mensajes
  const info_messages = document.getElementsByClassName("message-element");

  function fadeOut(el, speed) {
    let opacity = 1;
    const timer = setInterval(function () {
      if (opacity <= 0.1) {
        clearInterval(timer);
        el.style.display = "none";
      }
      el.style.opacity = opacity;
      opacity -= opacity * 0.1;
    }, speed);
  }

  setTimeout(function () {
    for (let i = 0; i < info_messages.length; i++) {
      setTimeout(function () {
        fadeOut(info_messages[i], 50);
      }, i * 100);
    }
  }, 5000);

  //código cerrar modales
  var modals = document.querySelectorAll(".modal");
  var cerrarModales = document.querySelectorAll(".close");

  cerrarModales.forEach(function (cerrarModal) {
    cerrarModal.addEventListener("click", function () {
      modals.forEach(function (modal) {
        modal.style.display = "none";
      });
    });
  });

  window.addEventListener("click", function (event) {
    modals.forEach(function (modal) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  });
});
