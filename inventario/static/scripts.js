document.addEventListener("DOMContentLoaded", function () {
  // Ocultar mensajes automáticamente después de 5 segundos
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
    Array.from(info_messages).forEach(function (message, index) {
      setTimeout(function () {
        fadeOut(message, 50);
      }, index * 100);
    });
  }, 5000);

  // Cerrar modales al hacer clic en el botón de cierre o fuera del modal
  const modals = document.querySelectorAll(".modal");
  const cerrarModales = document.querySelectorAll(".close");

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

