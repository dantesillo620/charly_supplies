import { Categoria, CategoriaId, Producto } from './catalog.models';

/**
 * CATÁLOGO — archivo para editar productos y categorías.
 *
 * Modo demostración: mientras sea `true`, se muestran las fichas marcadas con
 * `esEjemplo: true`. Al cargar los productos reales, cámbialo a `false`
 * (y, si quieres, borra las fichas de ejemplo de la lista).
 */
export const MODO_DEMOSTRACION = true;

/** Categorías iniciales (editables). El orden es el de los filtros. */
export const CATEGORIAS: readonly Categoria[] = [
  {
    id: 'encendedores',
    nombre: 'Encendedores',
    resumen: 'Para traer siempre contigo. Pregunta por los modelos disponibles.',
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

const DESCRIPCION_EJEMPLO =
  'Ficha de demostración. Aquí aparecerán la descripción y las fotos del producto real.';

/**
 * Productos. Para agregar uno real, copia esta plantilla:
 *
 * {
 *   id: 'enc-001',
 *   nombre: 'Nombre del producto',
 *   categoria: 'encendedores',            // 'encendedores' | 'pipas' | 'otros'
 *   descripcion: 'Texto opcional.',
 *   imagenes: [
 *     { src: '/images/productos/enc-001-1.webp', alt: 'Descripción de la foto', ancho: 1200, alto: 1200 },
 *     { src: '/images/productos/enc-001-2.webp', alt: 'Otra vista', ancho: 1200, alto: 1200 },
 *   ],
 *   precio: 150,                          // opcional; sin precio se muestra "Consultar precio"
 *   destacado: true,                      // aparece en la portada
 *   esEjemplo: false,
 * },
 */
export const PRODUCTOS: readonly Producto[] = [
  {
    id: 'ejemplo-enc-01',
    nombre: 'Encendedor de ejemplo 01',
    categoria: 'encendedores',
    descripcion: DESCRIPCION_EJEMPLO,
    imagenes: [],
    destacado: true,
    esEjemplo: true,
  },
  {
    id: 'ejemplo-pip-01',
    nombre: 'Pipa de ejemplo 01',
    categoria: 'pipas',
    descripcion: DESCRIPCION_EJEMPLO,
    imagenes: [],
    destacado: true,
    esEjemplo: true,
  },
  {
    id: 'ejemplo-acc-01',
    nombre: 'Accesorio de ejemplo 01',
    categoria: 'otros',
    descripcion: DESCRIPCION_EJEMPLO,
    imagenes: [],
    destacado: true,
    esEjemplo: true,
  },
  {
    id: 'ejemplo-enc-02',
    nombre: 'Encendedor de ejemplo 02',
    categoria: 'encendedores',
    descripcion: DESCRIPCION_EJEMPLO,
    imagenes: [],
    destacado: false,
    esEjemplo: true,
  },
  {
    id: 'ejemplo-pip-02',
    nombre: 'Pipa de ejemplo 02',
    categoria: 'pipas',
    descripcion: DESCRIPCION_EJEMPLO,
    imagenes: [],
    destacado: false,
    esEjemplo: true,
  },
  {
    id: 'ejemplo-acc-02',
    nombre: 'Accesorio de ejemplo 02',
    categoria: 'otros',
    descripcion: DESCRIPCION_EJEMPLO,
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

export function nombreCategoria(id: CategoriaId): string {
  return CATEGORIAS.find((c) => c.id === id)?.nombre ?? id;
}

export function esCategoria(valor: string | null): valor is CategoriaId {
  return CATEGORIAS.some((c) => c.id === valor);
}

const formatoPrecio = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

export function textoPrecio(producto: Producto): string {
  return producto.precio != null ? formatoPrecio.format(producto.precio) : 'Consultar precio';
}
