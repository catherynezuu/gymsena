document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const botonImprimir = document.getElementById("imprimir_historial");
  const campoCedula = document.getElementById("input_cedula");
  const campoFechaInicio = document.getElementById("input_fecha_inicio");
  const campoFechaFin = document.getElementById("input_fecha_fin");
  const limpiarDocumento = document.getElementById("clean_document");
  const limpiarInicio = document.getElementById("clean_start");
  const limpiarFin = document.getElementById("clean_end");

  // Función para filtrar la tabla
  const filtrarTabla = () => {
    const cedula = campoCedula.value.trim();
    let fechaInicio = campoFechaInicio.value;
    let fechaFin = campoFechaFin.value;

    // Validar fechas
    if (fechaInicio && fechaFin && fechaFin < fechaInicio) {
      campoFechaFin.value = fechaInicio;
      fechaFin = fechaInicio;
    }

    const filas = document.querySelectorAll(".table_container tbody tr");
    filas.forEach(function (fila) {
      let mostrar = true;
      const cedulaFila = fila.querySelector("td:nth-child(2)").textContent;
      const fechaPrestamo = fila.getAttribute("data-inicio");

      // Aplicar filtros
      if (cedula && cedulaFila !== cedula) mostrar = false;

      if (fechaInicio && !fechaFin && fechaInicio !== fechaPrestamo)
        mostrar = false;
      else {
        if (fechaInicio && fechaPrestamo < fechaInicio) mostrar = false;
        if (fechaFin && fechaPrestamo > fechaFin) mostrar = false;
      }

      fila.style.display = mostrar ? "" : "none";
    });
  };

  // Función para imprimir la tabla
  const imprimirTabla = (tabla, cedula, desde, hasta) => {
    const ventana = window.open("", "PRINT");
    ventana.document.write(
      "<html><head><title>Historial Transacciones</title>"
    );
    ventana.document.write(
      "<style> " +
        "body{font-size:20px; font-family: Arial, Helvetica, sans-serif;} " +
        "table{width: 100%; border-collapse: collapse;} " +
        "table, th, td{border: 1px solid gray;} " +
        "td{text-align:center;} " +
        "thead {border-bottom: 2px solid black}" +
        "</style>"
    );
    ventana.document.write("</head><body>");

    ventana.document.write(
      '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; margin-bottom: 2em; place-items:center;">'
    );
    if (cedula) {
      ventana.document.write("<div><span>Cédula:</span>" + cedula + "</div>");
    } else {
      ventana.document.write("<div><span>Cédula:</span>" + "Todos" + "</div>");
    }
    if (desde) {
      ventana.document.write("<div><span>Desde:</span>" + desde + "</div>");
    } else {
      ventana.document.write(
        "<div><span>Desde:</span>" +
          document.querySelector(".table_container tbody tr:first-child").getAttribute("data-inicio") +
          "</div>"
      );
    }
    if (hasta) {
      ventana.document.write("<div><span>Hasta:</span>" + hasta + "</div>");
    } else {
      ventana.document.write(
        "<div><span>Hasta:</span>" +
          new Date().toLocaleDateString("es-ES") +
          "</div>"
      );
    }
    ventana.document.write("</div>");
    ventana.document.write(tabla.innerHTML);
    ventana.document.write("</body></html>");
    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
  };

  // Evento click en el botón de imprimir
  botonImprimir.addEventListener("click", () => {
    const tabla = document.querySelector(".table_container");
    filtrarTabla();
    imprimirTabla(tabla, campoCedula.value, campoFechaInicio.value, campoFechaFin.value);
  });

  // Evento submit en el formulario de filtro
  document
    .getElementById("filter_form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      filtrarTabla();
    });

  // Función para limpiar un campo y ocultar el botón de limpieza
  const limpiarCampo = (campo, boton) => {
    campo.value = "";
    boton.style.display = "none";
  };

  // Función para mostrar u ocultar el botón de limpieza según el contenido del campo
  const mostrarBoton = (campo, boton) => {
    if (campo.value) boton.style.display = "inline-block";
    else boton.style.display = "none";
  };

  // Eventos de limpieza
  limpiarDocumento.addEventListener("click", () => limpiarCampo(campoCedula, limpiarDocumento));
  limpiarInicio.addEventListener("click", () => limpiarCampo(campoFechaInicio, limpiarInicio));
  limpiarFin.addEventListener("click", () => limpiarCampo(campoFechaFin, limpiarFin));

  // Eventos de entrada para mostrar u ocultar botones de limpieza
  campoCedula.addEventListener("input", () => mostrarBoton(campoCedula, limpiarDocumento));
  campoFechaInicio.addEventListener("input", () => mostrarBoton(campoFechaInicio, limpiarInicio));
  campoFechaFin.addEventListener("input", () => mostrarBoton(campoFechaFin, limpiarFin));

  // Evento click en el botón de limpiar formulario
  const limpiarFormulario = document.getElementById("clean_form");
  limpiarFormulario.addEventListener("click", function () {
    document.getElementById("filter_form").reset();
    document
      .querySelectorAll("#filter_form section div span")
      .forEach((span) => (span.style.display = "none"));
  });

  // Evento click en celda de cédula para filtrar automáticamente
  const celdasCedula = document.querySelectorAll(
    ".table_container table tbody tr td:nth-child(2)"
  );
  celdasCedula.forEach((celda) => {
    celda.addEventListener("click", function () {
      const numero = celda.textContent.trim();
      campoCedula.value = numero;
      limpiarDocumento.style.display = "block";
    });
  });
});
