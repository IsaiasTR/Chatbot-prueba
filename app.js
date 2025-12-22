let ejercicios = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("ejercicios.json")
    .then(res => res.json())
    .then(data => {
      ejercicios = data;
      renderizarEjercicios(data); // muestra todo al inicio
    });
});

function buscar() {
  const texto = document.getElementById("inputPregunta").value.toLowerCase();
  const resultados = [];

  ejercicios.forEach(bloque => {
    const nuevosEnunciados = bloque.enunciados.filter(ej => {
      return (
        (ej.texto && ej.texto.toLowerCase().includes(texto)) ||
        (ej.items && ej.items.join(" ").toLowerCase().includes(texto)) ||
        (ej.funciones && ej.funciones.join(" ").toLowerCase().includes(texto))
      );
    });

    if (nuevosEnunciados.length > 0) {
      resultados.push({
        ...bloque,
        enunciados: nuevosEnunciados
      });
    }
  });

  renderizarEjercicios(resultados);
}

function renderizarEjercicios(data) {
  const container = document.getElementById("chat-container");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No se encontraron ejercicios.</p>";
    return;
  }

  data.forEach(bloque => {
    const titulo = document.createElement("h2");
    titulo.className = "titulo-seccion";
    titulo.textContent = `${bloque.titulo} (pág. ${bloque.pagina})`;
    container.appendChild(titulo);

    bloque.enunciados.forEach(ej => {
      const card = document.createElement("div");
      card.className = "ejercicio-card";

      if (ej.numero) {
        const h3 = document.createElement("h3");
        h3.textContent = `Ejercicio ${ej.numero}`;
        card.appendChild(h3);
      }

      if (ej.texto) {
        const p = document.createElement("p");
        p.textContent = ej.texto;
        card.appendChild(p);
      }

      if (ej.funciones) {
        ej.funciones.forEach(f => {
          const d = document.createElement("div");
          d.className = "latex-line";
          d.innerHTML = f;
          card.appendChild(d);
        });
      }

      if (ej.items) {
        const ul = document.createElement("ul");
        ej.items.forEach(it => {
          const li = document.createElement("li");
          li.textContent = it;
          ul.appendChild(li);
        });
        card.appendChild(ul);
      }

      container.appendChild(card);
    });
  });

  if (window.MathJax) MathJax.typesetPromise();
}
