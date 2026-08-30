# Catálogo Josué Rangel — Sueroterapia

Réplica en código fuente limpio (React + Tailwind CSS, con Vite) del
catálogo original. Mismo diseño y comportamiento, pero organizado en
componentes editables en vez de un solo HTML minificado.

## Cómo correrlo

Necesitas [Node.js](https://nodejs.org) instalado (v18 o más reciente).

```bash
npm install
npm run dev
```

Esto abre el sitio en `http://localhost:5173` con recarga automática al
guardar cambios.

Para generar la versión final lista para subir a un hosting:

```bash
npm run build
```

Los archivos quedan en la carpeta `dist/` — eso es lo que subes a tu
hosting (Vercel, Netlify, cPanel, etc).

## Publicarlo en GitHub Pages

1. Sube este proyecto a un repositorio de GitHub.
2. En GitHub, ve a `Settings > Pages`.
3. En `Build and deployment`, deja `Source` en `GitHub Actions`.
4. Haz un push a la rama `main`.

El workflow en `.github/workflows/deploy.yml` compila y publica el sitio
automáticamente. Como las rutas usan `BASE_URL`, funciona aunque el repo
se sirva dentro de una subruta de GitHub Pages.

## Estructura del proyecto

```
src/
  data/products.js       ← Los 12 sueros: nombre, descripción, beneficios, imagen.
  components/
    Header.jsx            ← Barra superior con logo y "Catálogo 2026".
    Hero.jsx               ← Título, subtítulo y filtro de categorías.
    SwipeHint.jsx           ← Aviso "Desliza →" en mobile.
    ProductCarousel.jsx     ← Carrusel: flechas, dots, scroll-snap.
    ProductCard.jsx         ← Tarjeta individual de cada suero.
    QuickAccess.jsx          ← Banner explicativo + 4 accesos rápidos.
    Footer.jsx                ← Contacto, disclaimer, copyright.
  App.jsx                     ← Une todos los componentes.
public/images/                ← Fotos reales de cada vial + logo.
```

## Cómo editar el contenido

**Agregar, quitar o cambiar un suero:** edita `src/data/products.js`.
Cada producto es un objeto con `id`, `commercialName`, `commercialTag`,
`technicalName`, `category` (`"Vitaminas"` o `"Antioxidantes"`),
`description`, `benefits` (arreglo de textos) e `image` (ruta dentro de
`public/images`).

**Cambiar una foto:** reemplaza el archivo correspondiente en
`public/images/` manteniendo el mismo nombre, o cambia la ruta en
`products.js`.

**Completar el WhatsApp:** en `src/components/Footer.jsx` hay un
comentario `// TODO` donde debes poner el link real, por ejemplo
`https://wa.me/57XXXXXXXXXX`.

**Colores y tipografías:** están centralizados en `tailwind.config.js`
(`ink`, `teal`, `teal-dark`, y las familias `font-serif-display` /
`font-sans-ui`).

## Notas

- Las imágenes se sirven como archivos reales en `public/images/` (no
  en base64 embebido), así el proyecto pesa una fracción del HTML
  original y carga más rápido.
- Los íconos están en `src/components/Icons.jsx` como SVG puro, sin
  depender de ninguna librería externa de íconos.
