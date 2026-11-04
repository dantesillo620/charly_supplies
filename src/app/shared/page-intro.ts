import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from './icon';

/** Cabecera editorial de páginas internas (franja negra con título grande). */
@Component({
  selector: 'app-page-intro',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="intro superficie-oscura">
      <div class="contenedor intro__interior">
        <p class="antetitulo antetitulo--rojo entra">
          <app-icon nombre="destello" /> {{ antetitulo() }}
        </p>
        <h1 class="display intro__titulo entra" style="--d: 1">{{ titulo() }}</h1>
        <p class="texto-grande entra" style="--d: 2"><ng-content /></p>
      </div>
      <app-icon class="intro__destello" nombre="destello" />
    </div>
  `,
  styles: `
    .intro {
      position: relative;
      overflow: hidden;
      border-bottom: 6px solid var(--rojo);
    }
    .intro__interior {
      position: relative;
      z-index: 1;
      display: grid;
      gap: 1.25rem;
      padding-block: clamp(2.5rem, 7vw, 5rem);
    }
    .intro__titulo {
      font-size: clamp(3.25rem, 13vw, 8rem);
    }
    .intro__destello {
      position: absolute;
      right: -2.5rem;
      bottom: -3rem;
      width: clamp(7rem, 22vw, 18rem);
      height: clamp(7rem, 22vw, 18rem);
      color: var(--carbon-2);
    }
    @media (prefers-reduced-motion: no-preference) {
      .entra {
        animation: entrada-arriba 520ms var(--ease-out) both;
        animation-delay: calc(var(--d, 0) * 70ms);
      }
    }
  `,
})
export class PageIntro {
  readonly antetitulo = input.required<string>();
  readonly titulo = input.required<string>();
}
