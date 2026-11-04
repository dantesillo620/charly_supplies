import { PRODUCTOS } from '../catalog/catalog.data';
import { Producto } from '../catalog/catalog.models';
import {
  MENSAJE_GENERAL,
  WHATSAPP_GENERAL,
  enlaceWhatsAppProducto,
  mensajeProducto,
} from './whatsapp';

const base: Producto = {
  id: 'enc-999',
  nombre: 'Encendedor & Co',
  categoria: 'encendedores',
  imagenes: [],
  destacado: false,
  esEjemplo: false,
};

describe('whatsapp', () => {
  it('codifica la consulta general', () => {
    expect(WHATSAPP_GENERAL).toBe(
      `https://wa.me/523320700734?text=${encodeURIComponent(MENSAJE_GENERAL)}`,
    );
  });

  it('el pedido incluye nombre, referencia, precio y enlace a la foto', () => {
    const url = enlaceWhatsAppProducto({ ...base, precio: 85, precioAntes: 120 });
    const texto = decodeURIComponent(url.split('text=')[1]);
    expect(url.startsWith('https://wa.me/523320700734?text=')).toBe(true);
    expect(url).not.toContain(' ');
    expect(texto).toContain('quiero pedir el Encendedor & Co (ref. enc-999) de $85.');
    expect(texto).toContain('costo de envío');
    expect(texto).toMatch(/Foto del producto: https?:\/\/[^ ]+\/catalogo\/enc-999$/);
  });

  it('sin precio pregunta precio, disponibilidad y envío', () => {
    expect(mensajeProducto(base)).toContain(
      '¿Me compartes precio, disponibilidad y costo de envío?',
    );
  });

  it('todos los encendedores tienen precio de promoción', () => {
    const encendedores = PRODUCTOS.filter((p) => p.categoria === 'encendedores' && !p.esEjemplo);
    expect(encendedores.length).toBe(8);
    expect(encendedores.every((p) => p.precio === 85 && p.precioAntes === 120)).toBe(true);
  });
});
