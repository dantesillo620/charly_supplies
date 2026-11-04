import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NEGOCIO } from '../../core/business.config';
import { WHATSAPP_GENERAL } from '../../core/whatsapp';
import { BrandLogo } from '../../shared/brand-logo';
import { Icon } from '../../shared/icon';
import { NAVEGACION } from '../nav';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, BrandLogo, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  host: { '(document:keydown.escape)': 'alEscape()' },
})
export class SiteHeader {
  protected readonly nav = NAVEGACION;
  protected readonly whatsapp = WHATSAPP_GENERAL;
  protected readonly horario = NEGOCIO.horario;
  protected readonly menuAbierto = signal(false);
  protected readonly desplazado = signal(false);

  private readonly toggle = viewChild.required<ElementRef<HTMLButtonElement>>('toggle');

  constructor() {
    const destroyRef = inject(DestroyRef);

    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuAbierto.set(false));

    afterNextRender(() => {
      const alDesplazar = () => this.desplazado.set(window.scrollY > 8);
      alDesplazar();
      window.addEventListener('scroll', alDesplazar, { passive: true });

      // Al pasar a escritorio el menú móvil deja de existir: se cierra.
      const escritorio = matchMedia('(min-width: 900px)');
      const alCambiar = (e: MediaQueryListEvent) => e.matches && this.menuAbierto.set(false);
      escritorio.addEventListener('change', alCambiar);

      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', alDesplazar);
        escritorio.removeEventListener('change', alCambiar);
      });
    });
  }

  protected alternarMenu(): void {
    this.menuAbierto.update((v) => !v);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }

  protected alEscape(): void {
    if (!this.menuAbierto()) return;
    this.menuAbierto.set(false);
    this.toggle().nativeElement.focus();
  }
}
