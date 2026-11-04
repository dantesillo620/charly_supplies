/**
 * Datos de contacto del negocio. ÚNICO lugar a editar cuando cambien.
 *
 * Los campos `null` (o listas vacías) no se muestran en el sitio. Para
 * publicar la dirección basta con reemplazar `null` por el objeto
 * correspondiente (hay un ejemplo comentado abajo).
 */

export interface HorarioAtencion {
  /** Texto visible, p. ej. "Lunes a viernes". */
  dias: string;
  /** Texto visible, p. ej. "9:00 a. m. – 6:00 p. m.". */
  horas: string;
}

export interface DireccionNegocio {
  /** Dirección tal como se mostrará al visitante. */
  texto: string;
  /** Enlace opcional a Google Maps. */
  mapaUrl?: string;
  /** Datos para Google (JSON-LD). */
  calle: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
}

export interface InstagramNegocio {
  /** Usuario sin "@", p. ej. "charlysupplies". */
  usuario: string;
  url: string;
}

export interface FacebookNegocio {
  url: string;
}

export interface EnvioNegocio {
  /** Texto visible sobre cómo se acuerda el envío. */
  texto: string;
  /**
   * Zonas de entrega a mostrar (p. ej. ['Guadalajara', 'Zapopan', 'Tlaquepaque']).
   * Vacío = no se muestra ninguna zona.
   */
  zonas: string[];
}

export interface NegocioConfig {
  nombre: string;
  telefono: {
    /** Como se muestra: "33 2070 0734". */
    visible: string;
    /** Formato internacional para enlaces tel: ("+523320700734"). */
    enlace: string;
  };
  /** Número para wa.me: código de país + número, solo dígitos. */
  whatsapp: string;
  horario: HorarioAtencion[];
  /** Mismo horario en formato schema.org (Mo-Fr 09:00-18:00) para Google. */
  horarioSchema: string[];
  direccion: DireccionNegocio | null;
  instagram: InstagramNegocio | null;
  facebook: FacebookNegocio | null;
  envio: EnvioNegocio;
}

export const NEGOCIO: NegocioConfig = {
  nombre: 'Charly Supplies',
  telefono: {
    visible: '33 2070 0734',
    enlace: '+523320700734',
  },
  whatsapp: '523320700734',
  horario: [{ dias: 'Lunes a domingo', horas: '9:00 a. m. – 9:00 p. m.' }],
  horarioSchema: ['Mo-Su 09:00-21:00'],

  // Pendiente. Ejemplo:
  // direccion: {
  //   texto: 'Calle 123, Colonia, Ciudad, Estado',
  //   mapaUrl: 'https://maps.app.goo.gl/...',
  //   calle: 'Calle 123', ciudad: 'Ciudad', estado: 'Estado', codigoPostal: '00000',
  // },
  direccion: null,

  instagram: { usuario: 'charly_supplies', url: 'https://www.instagram.com/charly_supplies/' },
  facebook: { url: 'https://www.facebook.com/share/19xLtMZP5T/' },

  envio: {
    texto:
      'El costo de envío depende de tu ubicación: lo acordamos por WhatsApp antes de cerrar tu pedido.',
    zonas: [],
  },
};
