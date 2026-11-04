# Charly Supplies

Sitio web de Charly Supplies hecho con Angular 22 y **prerenderizado (SSG)**: cada página
se genera como HTML estático con su SEO ya incluido.

## Requisitos

- Node.js 24 LTS (`nvm use` toma la versión de `.nvmrc`)

## Comandos

| Comando | Qué hace |
|---|---|
| `npm start` | Servidor de desarrollo en http://localhost:4200 |
| `npm run build` | Genera el sitio en `dist/charly-supplies/browser` |
| `npx ng test` | Ejecuta las pruebas |

## Editar contenido

| Qué | Dónde |
|---|---|
| Teléfono, WhatsApp, horario, dirección, Instagram | `src/app/core/business.config.ts` |
| Mensajes de WhatsApp | `src/app/core/whatsapp.ts` |
| Productos, categorías y **modo demostración** | `src/app/catalog/catalog.data.ts` |
| Logos (variantes y tamaños) | `src/app/core/brand.ts` · archivos en `public/brand/web/` |

- **Dirección / Instagram:** están en `null` y no se muestran. Reemplázalos por el objeto de
  ejemplo comentado en `business.config.ts` y aparecerán en contacto, pie de página y JSON-LD.
- **Productos reales:** guarda las fotos en `public/images/productos/` (WebP o JPG, de
  preferencia cuadradas o 4:5, ~1200 px) y agrega cada producto a `PRODUCTOS` con la plantilla
  comentada. La primera imagen es la portada; con dos o más se activa la galería del detalle.
  Sin `precio` se muestra «Consultar precio».
- **Quitar las fichas de ejemplo:** `MODO_DEMOSTRACION = false` en `catalog.data.ts`.
- **Fotos del local:** `public/images/tienda/` (reservada para uso futuro).
- Los logos originales de `public/brand/*.png` no se publican (ver `ignore` en `angular.json`);
  el sitio usa las copias optimizadas de `public/brand/web/`.

## SEO

- **Datos del sitio:** `src/app/core/site.config.ts` (dominio, descripción, imagen para redes,
  tipo de negocio para schema.org). Los datos de contacto vienen de `business.config.ts`.
- **Título y descripción por página:** propiedades `title` y `data.seo` en `src/app/app.routes.ts`.
- `SeoTitleStrategy` aplica en cada ruta el título, la descripción, el canonical, Open Graph y
  Twitter Card. La página de inicio también agrega el JSON-LD `Store`.
- `public/robots.txt` y `public/sitemap.xml`: actualiza el dominio y agrega cada página nueva.
- Imagen para compartir en redes: `public/og-image.jpg` (1200×630).

## Agregar una página

1. Crea el componente en `src/app/pages/<nombre>/<nombre>.ts` (con `export default`).
2. Agrega la ruta con su `title` y `data.seo` en `app.routes.ts`.
3. Agrega la URL a `public/sitemap.xml`.

## Despliegue

- **Vercel:** ya configurado en `vercel.json`; solo conecta el repositorio.
- **Hostinger (hosting compartido):** sube el contenido de `dist/charly-supplies/browser` a
  `public_html`. El `.htaccess` incluido maneja las URLs.
- **SSR más adelante:** cambia `"outputMode"` a `"server"` en `angular.json` y define
  `RenderMode.Server` para las rutas dinámicas en `src/app/app.routes.server.ts`
  (necesita un hosting con Node.js).
