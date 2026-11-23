## Explicación del Ejercicio 1 (E01) — Modelo, módulos y listado

En este primer ejercicio (`v0.1.0`) he construido la base modular de la SPA de gestión de incidencias utilizando JavaScript puro (Vanilla JS) y Vite, separando claramente la capa de datos, la vista y el renderizado en el DOM.

### 1. Arquitectura y separación en módulos (`import` / `export`)
En lugar de tener todo el código mezclado en un único script o escrito directamente en el HTML, he dividido la aplicación en tres piezas independientes:

* **Capa de datos en memoria (`src/services/incidenciesService.js`):**
  * He definido el array inicial de incidencias siguiendo el modelo del enunciado (`id`, `titol`, `descripcio`, `estat`, `prioritat`, `dataCreacio` y `assignat`), utilizando IDs únicos de tipo texto (`"inc-1"`, `"inc-2"`, etc.) y los estados exactos (`"obert"`, `"en procés"`, `"tancat"`).
  * He exportado la función `getIncidencies()`, que devuelve una copia del array (`[...incidencies]`) para proteger los datos originales frente a modificaciones accidentales. Este archivo no toca el DOM en ningún momento.

* **Componente visual de listado (`src/components/Llistat.js`):**
  * He creado una función pura `Llistat(llista)` que recibe el array de incidencias y retorna una cadena de texto (`string`) con el HTML de la tabla.
  * **Control de lista vacía:** Antes de generar las filas, comprueba si el array está vacío (`!llista || llista.length === 0`); en ese caso, devuelve un mensaje informativo (*"No hi ha cap incidència registrada."*) para evitar mostrar una tabla vacía sin contenido.
  * **Seguridad (Escape de HTML):** Los textos introducidos en los campos (`titol`, `descripcio`, `assignat`, etc.) se escapan antes de inyectarse en la tabla para que, si alguien escribe etiquetas HTML (como `<h1>` o `<script>`), el navegador las muestre como texto plano y no las ejecute.

* **Punto de entrada y renderizado (`src/main.js` e `index.html`):**
  * En `index.html` he dejado únicamente el contenedor raíz `<div id="app"></div>` y la carga del módulo principal.
  * En `main.js` importo tanto el servicio de datos (`getIncidencies`) como el componente (`Llistat`) y pinto en `#app` mediante `innerHTML` una cabecera común (`<header class="main-header">`) seguida del listado de incidencias.

---