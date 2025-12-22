let ejercicios = [];

// Cargar ejercicios desde el JSON
fetch("ejercicios.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo JSON");
    }
    return response.json();
  })
  .then(data => {
    ejercicios = data;
    console.log("Ejercicios cargados:", ejercicios.length);
  })
  .catch(error => {
    console.error(error);
    alert("Error al cargar los ejercicios");
  });

// Función del chatbot
function responder() {
  const input = document.getElementById("pregunta");
  const output = document.getElementById("respuesta");

  const consulta = input.value.trim().toLowerCase();

  if (!consulta) {
    output.textContent =
      "Ingresá una palabra clave, por ejemplo: límite o derivada.";
    return;
  }

  const resultados = ejercicios.filter(e =>
    e.contenido.toLowerCase().includes(consulta)
  );

  if (resultados.length === 0) {
    output.textContent =
      "No se encontraron ejercicios relacionados con ese tema.";
    return;
  }

  // Mostrar hasta 3 resultados
  output.textContent = resultados
    .slice(0, 3)
    .map(e =>
      `📘 ${e.archivo} (pág. ${e.pagina})\n${e.contenido}`
    )
    .join("\n\n");
}
