import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandLogo } from '../../shared/brand-logo';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, BrandLogo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="seccion superficie-clara">
      <div class="contenedor rejilla">
        <div class="placa">
          <app-brand-logo variante="negroBlanco" alt="" sizes="(min-width: 720px) 320px, 70vw" />
        </div>
        <div class="texto">
          <p class="antetitulo antetitulo--rojo">Error 404</p>
          <h1 class="titulo-seccion">Esta página no existe</h1>
          <p class="texto-grande">
            Puede que el enlace haya cambiado. Vuelve al inicio o revisa el catálogo.
          </p>
          <div class="acciones">
            <a class="btn btn--rojo" routerLink="/">Volver al inicio</a>
            <a class="btn btn--contorno" routerLink="/catalogo">Ver catálogo</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .rejilla {
      display: grid;
      gap: 2.5rem;
      align-items: center;
      @media (min-width: 720px) {
        grid-template-columns: minmax(0, 20rem) 1fr;
        gap: 4rem;
      }
    }
    .placa {
      max-width: 20rem;
      padding: 0.75rem;
      border: 2px solid var(--tinta);
      border-radius: var(--radio);
      background: var(--papel-logo);
    }
    .texto {
      display: grid;
      gap: 1.25rem;
      justify-items: start;
    }
    .acciones {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
  `,
})
export default class NotFound {}
