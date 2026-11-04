import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NEGOCIO } from '../../core/business.config';
import { WHATSAPP_GENERAL } from '../../core/whatsapp';
import { CATEGORIAS, PRECIO_ENCENDEDORES, formatearPrecio } from '../../catalog/catalog.data';
import { BrandLogo } from '../../shared/brand-logo';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, BrandLogo, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly whatsapp = WHATSAPP_GENERAL;
  protected readonly horario = NEGOCIO.horario;
  protected readonly promo =
    PRECIO_ENCENDEDORES.promocion != null
      ? {
          ahora: formatearPrecio(PRECIO_ENCENDEDORES.promocion),
          antes: formatearPrecio(PRECIO_ENCENDEDORES.regular),
        }
      : null;
  /**
   * La cinta repite los nombres de categoría; la segunda mitad es copia exacta de
   * la primera para que el desplazamiento continuo no tenga saltos.
   */
  protected readonly cinta = Array.from({ length: 8 }, () =>
    CATEGORIAS.map((c) => c.nombre),
  ).flat();

  private readonly capaLogo = viewChild.required<ElementRef<HTMLElement>>('capaLogo');
  private readonly capaDestellos = viewChild.required<ElementRef<HTMLElement>>('capaDestellos');

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    // Profundidad sutil: el logo y los destellos siguen al cursor (solo con mouse
    // y sin "reducir movimiento"). Se usa la propiedad `translate` para no chocar
    // con las animaciones CSS que ya usan `transform`.
    afterNextRender(() => {
      const permitido = matchMedia(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      );
      if (!permitido.matches) return;

      const logo = this.capaLogo().nativeElement;
      const destellos = this.capaDestellos().nativeElement;
      let objetivoX = 0;
      let objetivoY = 0;
      let x = 0;
      let y = 0;
      let cuadro = 0;

      const pintar = () => {
        x += (objetivoX - x) * 0.08;
        y += (objetivoY - y) * 0.08;
        logo.style.translate = `${(x * 10).toFixed(2)}px ${(y * 8).toFixed(2)}px`;
        destellos.style.translate = `${(x * -18).toFixed(2)}px ${(y * -14).toFixed(2)}px`;
        const quieto = Math.abs(objetivoX - x) < 0.001 && Math.abs(objetivoY - y) < 0.001;
        cuadro = quieto ? 0 : requestAnimationFrame(pintar);
      };
      const animar = () => {
        if (!cuadro) cuadro = requestAnimationFrame(pintar);
      };
      const alMover = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        objetivoX = ((e.clientX - r.left) / r.width - 0.5) * 2;
        objetivoY = ((e.clientY - r.top) / r.height - 0.5) * 2;
        animar();
      };
      const alSalir = () => {
        objetivoX = 0;
        objetivoY = 0;
        animar();
      };

      host.addEventListener('pointermove', alMover, { passive: true });
      host.addEventListener('pointerleave', alSalir);
      destroyRef.onDestroy(() => {
        cancelAnimationFrame(cuadro);
        host.removeEventListener('pointermove', alMover);
        host.removeEventListener('pointerleave', alSalir);
      });
    });
  }
}
