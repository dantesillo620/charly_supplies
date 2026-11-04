import { MENSAJE_GENERAL, WHATSAPP_GENERAL, enlaceWhatsApp, mensajeProducto } from './whatsapp';

describe('whatsapp', () => {
  it('codifica la consulta general', () => {
    expect(WHATSAPP_GENERAL).toBe(
      `https://wa.me/523320700734?text=${encodeURIComponent(MENSAJE_GENERAL)}`,
    );
  });

  it('arma la consulta de producto con nombre y referencia', () => {
    const url = enlaceWhatsApp(mensajeProducto('Encendedor & Co', 'enc-001'));
    expect(decodeURIComponent(url.split('text=')[1])).toBe(
      'Hola, me interesa Encendedor & Co, referencia enc-001. ¿Me comparten precio y disponibilidad?',
    );
    expect(url).not.toContain(' ');
  });
});
