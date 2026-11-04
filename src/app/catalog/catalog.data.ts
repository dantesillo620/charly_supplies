import { Categoria, CategoriaId, ImagenProducto, Producto } from './catalog.models';

/**
 * CATÁLOGO — archivo para editar productos, categorías y precios.
 *
 * Modo demostración: con `true` se muestran también las fichas marcadas con
 * `esEjemplo: true` (sirven para probar el diseño sin productos reales).
 */
export const MODO_DEMOSTRACION = false;

/**
 * Precio de TODOS los encendedores (MXN).
 * - Con promoción: se muestra `promocion` y `regular` tachado.
 * - Para terminar la promoción: `promocion: null` (se mostrará el regular).
 */
export const PRECIO_ENCENDEDORES: { regular: number; promocion: number | null } = {
  regular: 120,
  promocion: 85,
};

/** Categorías (editables). El orden es el de los filtros. */
export const CATEGORIAS: readonly Categoria[] = [
  {
    id: 'encendedores',
    nombre: 'Encendedores',
    resumen: 'Varios diseños para elegir. Pide el tuyo por WhatsApp.',
  },
  {
    id: 'pipas',
    nombre: 'Pipas',
    resumen: 'Piezas para elegir con calma. Consulta opciones y precios.',
  },
  {
    id: 'otros',
    nombre: 'Otros accesorios',
    resumen: 'Complementos y artículos relacionados. Escríbenos y te contamos.',
  },
];

/**
 * Foto procesada con scripts/optimizar-foto.sh (archivos en public/images/productos/web/).
 * `n` es el número de foto del producto: 1 = portada, 2, 3… = galería.
 */
function foto(id: string, alt: string, n = 1): ImagenProducto {
  const base = `/images/productos/web/${id}-${n}`;
  return {
    src: `${base}-1200.webp`,
    srcset: `${base}-600.webp 600w, ${base}-1200.webp 1200w`,
    compartir: `${base}-og.jpg`,
    alt,
    ancho: 1200,
    alto: 1200,
  };
}

const precioEncendedor =
  PRECIO_ENCENDEDORES.promocion != null
    ? { precio: PRECIO_ENCENDEDORES.promocion, precioAntes: PRECIO_ENCENDEDORES.regular }
    : { precio: PRECIO_ENCENDEDORES.regular };

/**
 * Productos. Para agregar uno:
 * 1. Guarda la foto en public/images/productos/ y ejecuta
 *    scripts/optimizar-foto.sh "public/images/productos/Mi foto.png" enc-009
 *    (para una segunda foto del mismo producto: ... enc-009 2)
 * 2. Copia una ficha de abajo y cambia id, nombre, descripción y fotos.
 *    Para otra categoría usa `categoria: 'pipas'` u `'otros'` y `precio: 150` (o sin precio).
 */
export const PRODUCTOS: readonly Producto[] = [
  {
    id: 'enc-001',
    nombre: 'Encendedor blanco Route 66',
    categoria: 'encendedores',
    descripcion: 'Encendedor blanco con el escudo de la Ruta 66 en negro.',
    imagenes: [foto('enc-001', 'Encendedor blanco con el escudo negro de la Ruta 66')],
    ...precioEncendedor,
    destacado: true,
    esEjemplo: false,
  },
  {
    id: 'enc-002',
    nombre: 'Encendedor de naipes negro y rosa',
    categoria: 'encendedores',
    descripcion:
      'Encendedor negro con cuadros rosas y figuras de la baraja: corazones, picas, tréboles y diamantes.',
    imagenes: [foto('enc-002', 'Encendedor negro con cuadros rosas y figuras de la baraja')],
    ...precioEncendedor,
    destacado: true,
    esEjemplo: false,
  },
  {
    id: 'enc-003',
    nombre: 'Encendedor negro American Legend con águila',
    categoria: 'encendedores',
    descripcion:
      'Encendedor negro con la leyenda “American Legend”, un águila y la frase “Live to ride”.',
    imagenes: [
      foto('enc-003', 'Encendedor negro con la leyenda American Legend y un águila con listón'),
    ],
    ...precioEncendedor,
    destacado: true,
    esEjemplo: false,
  },
  {
    id: 'enc-004',
    nombre: 'Encendedor de naipes verde y rosa',
    categoria: 'encendedores',
    descripcion: 'Encendedor con cuadros verdes y rosas y figuras de la baraja en negro.',
    imagenes: [
      foto('enc-004', 'Encendedor con cuadros verdes y rosas y figuras de la baraja en negro'),
    ],
    ...precioEncendedor,
    destacado: false,
    esEjemplo: false,
  },
  {
    id: 'enc-005',
    nombre: 'Encendedor blanco J de corazones',
    categoria: 'encendedores',
    descripcion: 'Encendedor blanco con el diseño de la carta J de corazones.',
    imagenes: [foto('enc-005', 'Encendedor blanco con la carta J de corazones')],
    ...precioEncendedor,
    destacado: true,
    esEjemplo: false,
  },
  {
    id: 'enc-006',
    nombre: 'Encendedor plateado',
    categoria: 'encendedores',
    descripcion: 'Encendedor plateado liso, de tapa abatible.',
    imagenes: [foto('enc-006', 'Encendedor plateado liso con la tapa abierta')],
    ...precioEncendedor,
    destacado: false,
    esEjemplo: false,
  },
  {
    id: 'enc-007',
    nombre: 'Encendedor negro con águila y relámpagos',
    categoria: 'encendedores',
    descripcion:
      'Encendedor negro con un águila, relámpagos azules y la leyenda “American Legend”.',
    imagenes: [
      foto(
        'enc-007',
        'Encendedor negro con un águila, relámpagos azules y la leyenda American Legend',
      ),
    ],
    ...precioEncendedor,
    destacado: false,
    esEjemplo: false,
  },
  {
    id: 'enc-008',
    nombre: 'Encendedor negro mate',
    categoria: 'encendedores',
    descripcion: 'Encendedor negro mate liso, de tapa abatible.',
    imagenes: [foto('enc-008', 'Encendedor negro mate liso con la tapa abierta')],
    ...precioEncendedor,
    destacado: false,
    esEjemplo: false,
  },

  // ——— Fichas de ejemplo (solo visibles con MODO_DEMOSTRACION = true) ———
  {
    id: 'ejemplo-pip-01',
    nombre: 'Pipa de ejemplo 01',
    categoria: 'pipas',
    descripcion: 'Ficha de demostración.',
    imagenes: [],
    destacado: false,
    esEjemplo: true,
  },
  {
    id: 'ejemplo-acc-01',
    nombre: 'Accesorio de ejemplo 01',
    categoria: 'otros',
    descripcion: 'Ficha de demostración.',
    imagenes: [],
    destacado: false,
    esEjemplo: true,
  },
];

// ——— Utilidades (no es necesario editarlas) ———

/** Productos publicados: oculta las fichas de ejemplo si el modo demostración está apagado. */
export const PRODUCTOS_VISIBLES: readonly Producto[] = PRODUCTOS.filter(
  (p) => MODO_DEMOSTRACION || !p.esEjemplo,
);

export const PRODUCTOS_DESTACADOS: readonly Producto[] = PRODUCTOS_VISIBLES.filter(
  (p) => p.destacado,
);

export const HAY_EJEMPLOS = PRODUCTOS_VISIBLES.some((p) => p.esEjemplo);

export function productoPorId(id: string | null | undefined): Producto | undefined {
  return PRODUCTOS_VISIBLES.find((p) => p.id === id);
}

export function contarPorCategoria(id: CategoriaId): number {
  return PRODUCTOS_VISIBLES.filter((p) => p.categoria === id).length;
}

export function nombreCategoria(id: CategoriaId): string {
  return CATEGORIAS.find((c) => c.id === id)?.nombre ?? id;
}

export function esCategoria(valor: string | null): valor is CategoriaId {
  return CATEGORIAS.some((c) => c.id === valor);
}

/** Ruta de la página del producto (la que se comparte en WhatsApp). */
export function rutaProducto(producto: Producto): string {
  return `/catalogo/${producto.id}`;
}

const formatoPrecio = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatearPrecio(valor: number): string {
  return formatoPrecio.format(valor);
}

export function textoPrecio(producto: Producto): string {
  return producto.precio != null ? formatearPrecio(producto.precio) : 'Consultar precio';
}

export function enPromocion(producto: Producto): boolean {
  return (
    producto.precio != null &&
    producto.precioAntes != null &&
    producto.precioAntes > producto.precio
  );
}
