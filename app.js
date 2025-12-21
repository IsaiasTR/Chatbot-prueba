function send() {
  const input = document.getElementById("input");
  const text = input.value.toLowerCase();
  input.value = "";

  addMessage(text, "user");

  let response = "No entiendo la consulta.";

  if (text.includes("derivada")) {
    response = "La derivada mide la tasa de cambio de una función.";
  }

  if (text.includes("limite")) {
    response = "El límite describe el comportamiento de una función cerca de un punto.";
  }

  if (text.includes("continuidad")) {
    response = "Una función es continua si cumple las tres condiciones clásicas.";
  }

  addMessage(response, "bot");
}

function addMessage(text, type) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = type;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
