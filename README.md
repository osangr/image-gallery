# Image Gallery

Galería de imágenes con scroll infinito, animaciones suaves y eliminación de fotos por click o teclado.

## Demo

https://image-gallery-six-blue.vercel.app/

---

## Instalación y arranque

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Ejecutar los tests

```bash
npm test
```

Para ejecutar los tests una sola vez sin modo watch:

```bash
npm test -- --run
```

---

## Decisiones técnicas

### React + Vite en lugar de Next.js

Aunque la posición es para Next.js, decidí usar React con Vite porque esta prueba no requiere navegación entre páginas, SSR ni ninguna de las funcionalidades que hacen fuerte a Next.js. Añadir todo el boilerplate de Next.js para no aprovechar ninguna de sus ventajas no tenía sentido.

### API de Picsum en lugar de jsonplaceholder

Como la API de jsonplaceholder no estaba disponible durante el desarrollo la sustituí por Picsum Photos, que ofrece una interfaz similar con imágenes reales, ya que el objetivo de la prueba es demostrar el funcionamiento de la galería independientemente de la fuente de datos.

### Arquitectura y organización de carpetas

Para un proyecto de este tamaño, opté por una estructura sencilla agrupando por funcionalidad (componentes, hooks y tipos) sin añadir capas innecesarias. En un proyecto más grande consideraría separar por features o seguir otro tipo de arquitectura

```
src/
  components/
    EmptyState/
    ErrorMessage/
    ImageCard/
    ImageGallery/
    Skeleton/
    ScrollToTop/
    Spinner/
  hooks/
    usePhotos.ts
  styles/
    variables.scss
  types/
    index.ts
```

La lógica de datos está completamente separada de la UI. `usePhotos` gestiona el fetch, la paginación, el estado de carga y la eliminación. Los componentes solo se ocupan de renderizar.

### SCSS Modules

Usé SCSS porque era un requisito deseable de la oferta. Concretamente usé CSS Modules para evitar colisiones de estilos y variables compartidas en un archivo `variables.scss` para mantener consistencia entre el grid de la galería y el skeleton loader — ambos usan exactamente las mismas columnas y gap.

### IntersectionObserver nativo

Para el scroll infinito usé la API nativa `IntersectionObserver` en lugar de una librería externa. Es suficientemente potente para este caso de uso y evita añadir dependencias innecesarias al proyecto.

### Framer Motion

Las animaciones CSS puras daban saltos visibles en el grid al eliminar elementos. Tras investigar, usé Framer Motion para resolverlo. `AnimatePresence` mantiene el elemento en el DOM hasta que la animación de salida finaliza, lo que elimina los saltos.

### crypto.randomUUID()

Usé `crypto.randomUUID()` para generar IDs únicos por elemento. La API de Picsum repite IDs entre páginas, lo que causaba problemas con las keys de React al eliminar elementos.

### Rendimiento del DOM

Soy consciente del problema de rendimiento que puede suponer un DOM con muchos elementos. Tras investigar, concluí que la virtualización es compleja de implementar correctamente en un grid con animaciones de Framer Motion, y que el volumen de datos de esta API no supone un problema real de rendimiento en la práctica. En un proyecto con mayor volumen de datos, implementaría `react-window` o `TanStack Virtual` para virtualizar el grid y mantener en el DOM únicamente los elementos visibles en cada momento, descartando los que están fuera de pantalla.

### Tests

Tests unitarios para las dos piezas principales de la app. Para el componente `ImageCard` se testea el renderizado, la eliminación al hacer clic y por teclado con Enter y Space, y el `aria-label` correcto. Para el hook `usePhotos` se testea la carga inicial de fotos, el manejo de errores de la API, la eliminación correcta de una foto y la carga de más imágenes al paginar. También se testea el componente `ScrollToTop`: que el botón no se muestra al inicio, que aparece al hacer scroll y que al hacer clic llama a `window.scrollTo` con los parámetros correctos.

### Accesibilidad

Las imágenes son navegables y eliminables únicamente con teclado mediante Tab para moverse entre ellas y Enter o Space para eliminarlas. Cada imagen tiene un `aria-label` descriptivo con el nombre del autor. Los estados de carga y error usan `role="status"` y `role="alert"` respectivamente para comunicar cambios a lectores de pantalla.

---

## Uso de IA

Para este proyecto usé GitHub Copilot para autocompletado — especialmente útil para generar mocks en los tests, código repetitivo y el Skeleton antes de cargar las imágenes. También usé Claude para investigar y resolver problemas con animaciones CSS en el grid y para ayudarme a estructurar y documentar este README.
