let ejercicios = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("ejercicios.json")
    .then(r => r.json())
    .then(data => {
      ejercicios = data;
      mensajeBot(
        "Hola 👋 Soy el asistente virtual de Análisis Matemático 1 - CÁTEDRA: VAZQUEZ MAGNANI.<br>" +
        "Buscá ejercicios por tema (ej: funciones lineales, límites, derivadas, etc)."
      );
    })
    .catch(() => {
      mensajeBot("Error al cargar los ejercicios.");
    });
});

function mensajeUsuario(texto) {
  const chat = document.getElementById("chat-container");
  const div = document.createElement("div");
  div.className = "mensaje usuario";
  div.textContent = texto;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function mensajeBot(html) {
  const chat = document.getElementById("chat-container");
  const div = document.createElement("div");
  div.className = "mensaje bot";
  div.innerHTML = html;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  if (window.MathJax) MathJax.typesetPromise();
}

function buscar() {
  const input = document.getElementById("inputPregunta");
  const texto = input.value.trim().toLowerCase();
  if (!texto) return;

  mensajeUsuario(input.value);
  input.value = "";

  let respuesta = "";
  let encontrados = 0;

  ejercicios.forEach(bloque => {
    bloque.enunciados.forEach(ej => {

      const contenido =
        (ej.texto || "") +
        (ej.items ? ej.items.join(" ") : "") +
        (ej.funciones ? ej.funciones.join(" ") : "") +
        (ej.sistemas ? ej.sistemas.join(" ") : "");

      if (contenido.toLowerCase().includes(texto) && encontrados < 3) {

        respuesta += `<strong>${bloque.titulo}</strong> (pág. ${bloque.pagina})<br>`;

        if (ej.texto) {
          respuesta += `${ej.texto}<br>`;
        }

        if (ej.funciones) {
          respuesta += "<ul>";
          ej.funciones.forEach(f => {
            respuesta += `<li>${f}</li>`;
          });
          respuesta += "</ul>";
        }

        if (ej.items) {
          respuesta += ej.items.join(" ") + "<br>";
        }

        if (ej.sistemas) {
          respuesta += "<ul>";
          ej.sistemas.forEach(s => {
            respuesta += `<li>${s}</li>`;
          });
          respuesta += "</ul>";
        }

        respuesta += "<br>";
        encontrados++;
      }
    });
  });

  if (respuesta === "") {
    mensajeBot(
      "No encontré ejercicios para ese tema.<br>" +
      "Probá con otra palabra clave."
    );
  } else {
    mensajeBot(respuesta);
  }
}
