import { NEGOCIO } from './business.config';

/**
 * Enlaces de WhatsApp (wa.me). Solo abren una conversación con un mensaje
 * prellenado: no registran compras, pedidos ni reservas.
 */

export const MENSAJE_GENERAL =
  'Hola, vi el catálogo de Charly Supplies y me gustaría recibir información sobre sus accesorios.';

export function mensajeProducto(nombre: string, id: string): string {
  return `Hola, me interesa ${nombre}, referencia ${id}. ¿Me comparten precio y disponibilidad?`;
}

export function enlaceWhatsApp(mensaje: string = MENSAJE_GENERAL): string {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/** Enlace para la consulta general al negocio (botones de encabezado, portada, contacto). */
export const WHATSAPP_GENERAL = enlaceWhatsApp();
