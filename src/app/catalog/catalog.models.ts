export type CategoriaId = 'encendedores' | 'pipas' | 'otros';

export interface Categoria {
  id: CategoriaId;
  nombre: string;
  /** Texto breve y genérico; no debe prometer marcas, materiales ni existencias. */
  resumen: string;
}

export interface ImagenProducto {
  /** Ruta pública, p. ej. "/images/productos/encendedor-rojo-1.webp". */
  src: string;
  /** Descripción de la foto para lectores de pantalla. */
  alt: string;
  /** Medidas reales del archivo (evitan saltos de contenido). Por defecto 1200×1200. */
  ancho?: number;
  alto?: number;
}

export interface Producto {
  /** Referencia única; aparece en el mensaje de WhatsApp. Sin espacios. */
  id: string;
  nombre: string;
  categoria: CategoriaId;
  descripcion?: string;
  /** La primera es la portada. Arreglo vacío = marcador gráfico. */
  imagenes: ImagenProducto[];
  /** Precio en MXN. Si no está confirmado, omítelo: se mostrará "Consultar precio". */
  precio?: number;
  destacado: boolean;
  /** `true` solo para fichas de demostración (no se pueden consultar). */
  esEjemplo: boolean;
}
