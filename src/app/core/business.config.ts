/**
 * Datos de contacto del negocio. ÚNICO lugar a editar cuando cambien.
 *
 * ⚠️ El teléfono y el horario se transcribieron de la referencia comercial
 * inicial: confírmalos con el negocio antes de publicar.
 *
 * Los campos `null` no se muestran en el sitio. Para publicar la dirección o
 * Instagram basta con reemplazar `null` por el objeto correspondiente
 * (hay ejemplos comentados abajo).
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
}

export const NEGOCIO: NegocioConfig = {
  nombre: 'Charly Supplies',
  telefono: {
    visible: '33 2070 0734',
    enlace: '+523320700734',
  },
  whatsapp: '523320700734',
  horario: [{ dias: 'Lunes a viernes', horas: '9:00 a. m. – 6:00 p. m.' }],
  horarioSchema: ['Mo-Fr 09:00-18:00'],

  // Pendiente. Ejemplo:
  // direccion: {
  //   texto: 'Calle 123, Colonia, Ciudad, Estado',
  //   mapaUrl: 'https://maps.app.goo.gl/...',
  //   calle: 'Calle 123', ciudad: 'Ciudad', estado: 'Estado', codigoPostal: '00000',
  // },
  direccion: null,

  // Pendiente. No usar una cuenta que no haya confirmado el negocio. Ejemplo:
  // instagram: { usuario: 'usuario_real', url: 'https://www.instagram.com/usuario_real/' },
  instagram: null,
};
