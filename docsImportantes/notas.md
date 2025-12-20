# 📘 NOTAS DE DESARROLLO - PROYECTO PICKUPS CHAMPS

## 1. Conceptos Base y Extensiones

**React / ReactJS:** Es la librería. "ReactJS" es el nombre viejo/histórico. En la práctica instalamos `react` (lógica) y `react-dom` (para renderizar en web).

**¿Qué extensión usar? (`.ts` vs `.tsx`)**

* **`.tsx` (TypeScript + JSX):** Úsalo SIEMPRE que el archivo tenga código HTML/Componentes visuales (ej: `<div>`, `<App />`).
* *Ejemplos:* `App.tsx`, `ChampionCard.tsx`, `ChampionGrid.tsx`.


* **`.ts` (TypeScript puro):** Úsalo para lógica pura, funciones, interfaces o llamadas a APIs. No puede tener etiquetas HTML.
* *Ejemplos:* `api/ddragon.ts`, `hooks/useChampionAssets.ts`, `constants/champions.ts`.


* *(Evitar `.js` y `.jsx` en este proyecto porque ya estamos usando TypeScript).*

---

## 2. Arquitectura y Patrones de Diseño

Estamos usando el patrón **"Contenedor vs. Presentacional"** (Container vs Presentational) para mantener el código limpio.

* **Componentes Presentacionales ("Tontos" o Visuales):**
* Solo se preocupan de *cómo se ve*.
* Reciben datos por `props`.
* Tienen mucho CSS (`className`).
* *Ejemplo:* `ChampionCard.tsx` (Muestra la foto y el nombre, no sabe de dónde vienen los datos).


* **Componentes Contenedores ("Inteligentes" o de Lógica):**
* Se preocupan de *cómo funciona*.
* Manejan listas, bucles (`.map`) y estructura.
* *Ejemplo:* `ChampionGrid.tsx` (Recibe la lista de campeones y decide cómo ordenarlos en la grilla).



---

## 3. Estilos: Tailwind vs. Vite

Para que Tailwind funcione bien y podamos usar todo el ancho de la pantalla, hay que limpiar los estilos por defecto que trae Vite.

**Jerarquía de Poder (CSS):**
`ID (#root)` > `Clase (.w-full)` > `Etiqueta (div)`
*Por eso `App.css` nos rompía el diseño, porque usaba IDs que bloqueaban a Tailwind.*

**Reglas de Limpieza:**

1. **`App.css`**: BORRARLO o dejarlo vacío. Es el causante de márgenes extraños y anchos limitados.
2. **`index.css`**: MANTENERLO pero LIMPIARLO. Solo debe tener:
```css
@import "tailwindcss";

```


*(Borrar cualquier regla de `body` como `display: flex` o `place-items: center`).*

**¿Dónde edito qué?**

* **Quiero un color nuevo o fuente personalizada:** → `tailwind.config.js` (Configuración).
* **Quiero cambiar el fondo de toda la web:** → `index.css` (Estilos globales).
* **Quiero centrar un div específico:** → Clases en el componente (`className="flex justify-center"`).

---

## 4. Estructura de Carpetas (Clean Code)

Organización dentro de `src/` (o `pickups-champs/`):

* 📂 **`api/`**: Funciones que piden datos externos (Data Dragon de Riot).
* `ddragon.ts`: Aquí va el `fetch` a la API.


* 📂 **`components/`**: Los bloques de construcción de la UI (Grids, Tarjetas, Botones).
* 📂 **`constants/`**: Datos fijos que no cambian (Listas de campeones `SUPPORT_POOL`, `ADC_POOL`).
* 📂 **`hooks/`**: Lógica de React reutilizable (Custom Hooks).
* `useChampionAssets.ts`: Se encarga de cargar las imágenes al iniciar la app.


* 📄 **`App.tsx`**: El componente principal que une todo (Layout general).
* 📄 **`main.tsx`**: El punto de entrada. Monta `App` en el HTML.

---

## 5. Flujo de Datos (Data Flow)

Así viaja la información en la app:

1. **`App.tsx`** carga.
2. Llama al hook **`useChampionAssets()`**.
3. El hook llama a la **API (`ddragon.ts`)** para buscar la versión del parche y las imágenes.
4. Cuando llegan los datos, `App.tsx` se actualiza y pasa la info (props) hacia abajo:
* `App` → pasa lista y urls → `ChampionGrid`
* `ChampionGrid` → itera y pasa datos individuales → `ChampionCard`
* `ChampionCard` → pinta la imagen en pantalla.