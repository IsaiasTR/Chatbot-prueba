const archivosJSON = [
  "guia1.json",
  "guia2.json",
  "guia3.json",
  "guia4.json",
  "guia5.json",
  "guia6.json",
  "guia7.json",
  "guia8.json"
];

let guias = [];

const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

/* ===============================
   CARGA DE JSON
================================ */

Promise.all(
  archivosJSON.map(ruta => fetch(ruta).then(r => r.json()))
).then(data => {
  guias = data;
  agregarMensajeBot("Chatbot listo. Indicá guía y ejercicio.");
});

/* ===============================
   CHAT
================================ */

sendBtn.addEventListener("click", procesarEntrada);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") procesarEntrada();
});

function procesarEntrada() {
  const texto = userInput.value.trim();
  if (!texto) return;

  agregarMensajeUsuario(texto);
  userInput.value = "";

  const guia = extraerNumero(texto, /gu[ií]a\s*(\d+)/i);
  const ejercicio = extraerNumero(texto, /ejercicio\s*(\d+)/i);

  if (!guia || !ejercicio) {
    agregarMensajeBot("Indicá claramente guía y ejercicio.");
    return;
  }

  const ej = buscarEjercicio(guia, ejercicio);
  if (!ej) {
    agregarMensajeBot("No encontré ese ejercicio.");
    return;
  }

  mostrarEjercicio(ej);
}

/* ===============================
   UTILIDADES
================================ */

function extraerNumero(texto, regex) {
  const m = texto.match(regex);
  return m ? parseInt(m[1]) : null;
}

function buscarEjercicio(nroGuia, nroEj) {
  const guia = guias.find(g => g.guia === nroGuia);
  if (!guia) return null;
  return guia.ejercicios.find(e => e.numero === nroEj);
}

/* ===============================
   RENDER
================================ */

function mostrarEjercicio(ej) {
  let html = "";

  if (ej.expresiones) {
    html += "<strong>Expresión:</strong>";
    ej.expresiones.forEach(e => {
      html += `<div>${e}</div>`;
    });
  }

  if (ej.resolucion) {
    html += "<strong>Resolución:</strong>";
    ej.resolucion.forEach(p => {
      html += `<div>${p}</div>`;
    });
  }

  agregarMensajeBot(html);
  MathJax.typesetPromise();
}

function agregarMensajeUsuario(texto) {
  chatMessages.innerHTML += `
    <div class="message user">${texto}</div>
  `;
}

function agregarMensajeBot(html) {
  chatMessages.innerHTML += `
    <div class="message bot">${html}</div>
  `;
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
