document
  .getElementById("filter_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const cedula = document.getElementById("input_cedula").value.trim();
    let fechaInicio = document.getElementById("input_fecha_inicio").value;
    let fechaFin = document.getElementById("input_fecha_fin").value;

    if (fechaInicio && fechaFin && fechaFin < fechaInicio) {
      document.getElementById("input_fecha_fin").value = fechaInicio;
      fechaFin = fechaInicio;
    }

    const filas = document.querySelectorAll(".table_container tbody tr");
    filas.forEach(function (fila) {
      let mostrar = true;
      const cedulaFila = fila.querySelector("td:nth-child(2)").textContent;
      const fechaPrestamo = fila.getAttribute("data-inicio");

      if (cedula && cedulaFila !== cedula) mostrar = false;

      if (fechaInicio && !fechaFin && fechaInicio !== fechaPrestamo)
        mostrar = false;
      else {
        if (fechaInicio && fechaPrestamo < fechaInicio) mostrar = false;
        if (fechaFin && fechaPrestamo > fechaFin) mostrar = false;
      }

      fila.style.display = mostrar ? "" : "none";
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  const cedula = document.getElementById("input_cedula");
  const fechaInicio = document.getElementById("input_fecha_inicio");
  const fechaFin = document.getElementById("input_fecha_fin");
  const cleanDocument = document.getElementById("clean_document");
  const cleanStart = document.getElementById("clean_start");
  const cleanEnd = document.getElementById("clean_end");

  const cleanField = (field, button) => {
    field.value = "";
    button.style.display = "none";
  };

  const displayButton = (field, button) => {
    if (field.value) button.style.display = "inline-block";
    else button.style.display = "none";
  };

  cleanDocument.addEventListener("click", () =>
    cleanField(cedula, cleanDocument)
  );
  cleanStart.addEventListener("click", () =>
    cleanField(fechaInicio, cleanStart)
  );
  cleanEnd.addEventListener("click", () => cleanField(fechaFin, cleanEnd));

  cedula.addEventListener("input", () => displayButton(cedula, cleanDocument));
  fechaInicio.addEventListener("input", () =>
    displayButton(fechaInicio, cleanStart)
  );
  fechaFin.addEventListener("input", () => displayButton(fechaFin, cleanEnd));

  const cleanForm = document.getElementById("clean_form");
  cleanForm.addEventListener("click", function () {
    document.getElementById("filter_form").reset();
    document
      .querySelectorAll("#filter_form section div span")
      .forEach((span) => (span.style.display = "none"));
  });

  const cedulaCell = document.querySelectorAll(
    ".table_container table tbody tr td:nth-child(2)"
  );
  cedulaCell.forEach((cell) => {
    cell.addEventListener("click", function () {
      const numero = cell.textContent.trim();
      document.getElementById("input_cedula").value = numero;
      cleanDocument.style.display = "block";
    });
  });
});
