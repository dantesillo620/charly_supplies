import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type NombreIcono =
  | 'destello'
  | 'chat'
  | 'flecha'
  | 'cerrar'
  | 'menu'
  | 'buscar'
  | 'reloj'
  | 'telefono'
  | 'ubicacion'
  | 'instagram'
  | 'facebook'
  | 'anterior'
  | 'siguiente'
  | 'encendedores'
  | 'pipas'
  | 'otros';

/** Iconos SVG en línea (decorativos: aria-hidden). Heredan el color del texto. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 24 24" focusable="false">
      @switch (nombre()) {
        @case ('destello') {
          <path
            fill="currentColor"
            d="M12 0c.7 6.6 4.7 10.9 12 12-7.3 1.1-11.3 5.4-12 12-.7-6.6-4.7-10.9-12-12 7.3-1.1 11.3-5.4 12-12Z"
          />
        }
        @case ('chat') {
          <path
            class="t"
            d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z M9 10.2c.3 1.9 2.6 4.2 4.6 4.6l1-1.2 2 .9c-.1 1-1 1.8-2.1 1.8-3.3-.2-6.6-3.5-6.8-6.8 0-1.1.8-2 1.8-2.1l.9 2Z"
          />
        }
        @case ('flecha') {
          <path class="t" d="M4 12h15M13 6l6 6-6 6" />
        }
        @case ('cerrar') {
          <path class="t" d="M6 6l12 12M18 6 6 18" />
        }
        @case ('menu') {
          <path class="t" d="M3.5 7h17M3.5 12h17M3.5 17h11" />
        }
        @case ('buscar') {
          <circle class="t" cx="10.5" cy="10.5" r="6.5" />
          <path class="t" d="m15.5 15.5 5 5" />
        }
        @case ('reloj') {
          <circle class="t" cx="12" cy="12" r="8.5" />
          <path class="t" d="M12 7.5V12l3 2" />
        }
        @case ('telefono') {
          <path
            class="t"
            d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z"
          />
        }
        @case ('ubicacion') {
          <path class="t" d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
          <circle class="t" cx="12" cy="10" r="2.3" />
        }
        @case ('instagram') {
          <rect class="t" x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle class="t" cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
        }
        @case ('facebook') {
          <path
            class="t"
            d="M14.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4a20 20 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.3H9v3h2.5V21"
          />
        }
        @case ('anterior') {
          <path class="t" d="M15 5l-7 7 7 7" />
        }
        @case ('siguiente') {
          <path class="t" d="M9 5l7 7-7 7" />
        }
        @case ('encendedores') {
          <rect class="t" x="7" y="9" width="10" height="12.5" rx="2" />
          <path class="t" d="M7 12.5h10M10 9V6.5h5V9" />
          <path class="t" d="M12.5 5c-1.2-1-1-2.6.3-3.5.2 1.3 1.4 1.7 1.2 3-.1.6-.6 1-1.5.5Z" />
        }
        @case ('pipas') {
          <path class="t" d="M3 9.5h8.5l1.2 1.8" />
          <path
            class="t"
            d="M12.7 11.3V8.5h7v5.5a3.5 3.5 0 0 1-3.5 3.5 3.5 3.5 0 0 1-3.5-3.5v-2.7Z"
          />
          <path class="t" d="M3 9.5v2h7.8" />
        }
        @case ('otros') {
          <rect class="t" x="3.5" y="3.5" width="7" height="7" rx="1.5" />
          <circle class="t" cx="17" cy="7" r="3.5" />
          <rect class="t" x="3.5" y="13.5" width="7" height="7" rx="3.5" />
          <path
            fill="currentColor"
            d="M17 12.8c.3 2.6 1.6 3.9 4.2 4.2-2.6.3-3.9 1.6-4.2 4.2-.3-2.6-1.6-3.9-4.2-4.2 2.6-.3 3.9-1.6 4.2-4.2Z"
          />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      width: 1.25em;
      height: 1.25em;
      flex: none;
      line-height: 0;
    }
    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .t {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }
  `,
})
export class Icon {
  readonly nombre = input.required<NombreIcono>();
}
