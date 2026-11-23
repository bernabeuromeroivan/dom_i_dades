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

### Exercici 2 (E02) — Navegació i vista de detall (`v0.2.0`)
En aquest segon increment s'ha dotat l'aplicació de navegació mitjançant rutes *hash* i d'una vista individual per consultar tota la informació de cada incidència:

* **Encaminador per *hash* (`src/router.js`):** S'ha implementat la funció `getRutaActual()` que llegeix `window.location.hash` per interpretar les rutes `#/incidencies` (llistat principal), `#/incidencies/ID` (extracció del paràmetre dinàmic `ID` per al detall) i redirigir automàticament quan s'accedeix a l'arrel sense *hash*.
* **Gestió d'esdeveniments a `src/main.js`:** L'escoltador `window.addEventListener("hashchange", render)` es registra una única vegada en arrencar l'aplicació, mantenint sempre fixa la capçalera i la navegació comuna entre vistes.
* **Vista de detall (`src/components/Detall.js`):** Nou component que rep una incidència obtinguda mitjançant `getIncidenciaById(id)` i en renderitza tots els camps (`id`, `titol`, `descripcio`, `estat`, `prioritat`, `assignat` i `dataCreacio`), juntament amb un enllaç de retorn al llistat.
* **Control de rutes i IDs inexistents:** Tant si s'introdueix una ruta no reconeguda (p. ex. `#/ruta-falsa`) com un identificador que no existeix al servei (p. ex. `#/incidencies/inc-999`), la interfície mostra un missatge informatiu clar i un botó per tornar a `#/incidencies`.

---

### Exercici 3 (E03) — Formulari d'alta i edició (`v0.3.0`)
En aquest tercer increment s'ha incorporat la creació i modificació d'incidències reutilitzant un mateix component de formulari:

* **Rutes d'alta i edició (`src/router.js`):** S'han afegit `#/incidencies/nova` (comprovada abans d'interpretar un segment com a ID) i `#/incidencies/ID/editar`.
* **Component reutilitzable (`src/components/formulari.js`):** La funció `Formulari(valors, errors, esEdicio)` renderitza tant el formulari de creació com el d'edició, associant cada `<label>` al seu camp per garantir la navegació completa amb teclat.
* **Validació i conservació de valors (`src/main.js`):** L'esdeveniment `submit` (amb `e.preventDefault()`) es delega a `#app` una única vegada. Es valida que títol, descripció i persona assignada no estiguin buits ni continguin només espais (`.trim()`), i que estat i prioritat tinguin valors vàlids. Si hi ha errors, es mostren sota cada camp mantenint els valors introduïts.
* **Alta, edició i cancel·lació (`src/services/incidenciesService.js`):**
  * En crear (`crearIncidencia`), es genera un `id` únic i la `dataCreacio` actual.
  * En editar (`actualitzarIncidencia`), es conserven intactes l'`id` i la `dataCreacio` originals.