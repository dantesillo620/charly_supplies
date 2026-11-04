import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Aparición progresiva al hacer scroll. El contenido se prerenderiza visible;
 * en el navegador solo se oculta (clase .reveal-pendiente) lo que todavía está
 * fuera de pantalla, y se muestra al entrar. Sin efecto con movimiento reducido.
 */
@Directive({ selector: '[appReveal]' })
export class Reveal {
  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (
        typeof IntersectionObserver === 'undefined' ||
        matchMedia('(prefers-reduced-motion: reduce)').matches ||
        el.getBoundingClientRect().top < window.innerHeight * 0.9
      ) {
        return;
      }

      el.classList.add('reveal-pendiente');
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            el.classList.remove('reveal-pendiente');
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -10% 0px' },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
