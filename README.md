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
| Teléfono, WhatsApp, horario, dirección, redes, envíos | `src/app/core/business.config.ts` |
| Mensajes de WhatsApp | `src/app/core/whatsapp.ts` |
| Productos, categorías, **precio/promoción de encendedores**, modo demostración | `src/app/catalog/catalog.data.ts` |
| Logos (variantes y tamaños) | `src/app/core/brand.ts` · archivos en `public/brand/web/` |

- **Agregar un producto:** guarda la foto en `public/images/productos/` y ejecuta
  `scripts/optimizar-foto.sh "public/images/productos/Mi foto.png" enc-009` (macOS, requiere
  `brew install webp`). Luego copia una ficha en `PRODUCTOS` con `foto('enc-009', 'descripción')`.
  Cada producto tiene su página `/catalogo/<id>`; agrégala también a `public/sitemap.xml`.
- **Promoción:** `PRECIO_ENCENDEDORES` en `catalog.data.ts`. Con `promocion: null` se muestra
  solo el precio regular.
- **Pedido por WhatsApp:** el mensaje incluye producto, referencia, precio y el enlace a su
  página; WhatsApp muestra la foto como vista previa. El envío se acuerda en el chat.
- **Zonas de entrega:** `envio.zonas` en `business.config.ts` (vacío = no se muestran).
- Las fotos originales (`public/images/productos/*.png`) y los logos originales no se publican
  (ver `ignore` en `angular.json`); el sitio usa las versiones de las carpetas `web/`.

## Dominio

`urlSitio()` en `src/app/core/site.config.ts` toma el dominio automáticamente: en Vercel usa
`VERCEL_PROJECT_PRODUCTION_URL` al compilar y en el navegador el dominio actual. Al compilar
para Hostinger, cambia `SITE.url` al dominio definitivo y actualiza `robots.txt` y `sitemap.xml`.

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
