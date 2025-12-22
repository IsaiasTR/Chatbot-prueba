// app.js

document.addEventListener("DOMContentLoaded", () => {
  cargarEjercicios();
});

async function cargarEjercicios() {
  try {
    const response = await fetch("ejercicios.json");
    const data = await response.json();
    renderizarEjercicios(data);
  } catch (error) {
    console.error("Error cargando el archivo JSON:", error);
  }
}

function renderizarEjercicios(data) {
  const container = document.getElementById("chat-container");
  container.innerHTML = "";

  data.forEach(bloque => {
    // Título por página
    const titulo = document.createElement("h2");
    titulo.textContent = `${bloque.titulo} (pág. ${bloque.pagina})`;
    titulo.className = "titulo-seccion";
    container.appendChild(titulo);

    bloque.enunciados.forEach(ej => {
      const card = document.createElement("div");
      card.className = "ejercicio-card";

      // Número
      if (ej.numero) {
        const numero = document.createElement("h3");
        numero.textContent = `Ejercicio ${ej.numero}`;
        card.appendChild(numero);
      }

      // Texto principal
      if (ej.texto) {
        const texto = document.createElement("p");
        texto.textContent = ej.texto;
        card.appendChild(texto);
      }

      // Observación
      if (ej.observacion) {
        const obs = document.createElement("p");
        obs.className = "observacion";
        obs.textContent = ej.observacion;
        card.appendChild(obs);
      }

      // LaTeX suelto
      if (ej.latex) {
        const latex = document.createElement("div");
        latex.innerHTML = ej.latex;
        card.appendChild(latex);
      }

      // Items (a, b, c...)
      if (ej.items) {
        const ul = document.createElement("ul");
        ej.items.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          ul.appendChild(li);
        });
        card.appendChild(ul);
      }

      // Funciones
      if (ej.funciones) {
        ej.funciones.forEach(f => {
          const fx = document.createElement("div");
          fx.className = "latex-line";
          fx.innerHTML = f;
          card.appendChild(fx);
        });
      }

      // Sistemas
      if (ej.sistemas) {
        ej.sistemas.forEach(sis => {
          const sistema = document.createElement("div");
          sistema.className = "latex-line";
          sistema.innerHTML = sis;
          card.appendChild(sistema);
        });
      }

      // Subitems
      if (ej.subitems) {
        const ul = document.createElement("ul");
        ej.subitems.forEach(sub => {
          const li = document.createElement("li");
          li.textContent = sub;
          ul.appendChild(li);
        });
        card.appendChild(ul);
      }

      container.appendChild(card);
    });
  });

  // Re-render MathJax
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
}

