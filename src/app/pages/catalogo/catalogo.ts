import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CatalogBrowser } from '../../catalog/catalog-browser/catalog-browser';
import { PageIntro } from '../../shared/page-intro';

@Component({
  selector: 'app-catalogo',
  imports: [PageIntro, CatalogBrowser],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-intro antetitulo="Encendedores · Pipas · Accesorios" titulo="Catálogo">
      Elige tu diseño y pídelo por WhatsApp: te llega el mensaje con el producto y su foto, y ahí
      acordamos disponibilidad y envío.
    </app-page-intro>
    <section class="seccion superficie-clara catalogo" aria-label="Productos">
      <div class="contenedor">
        <app-catalog-browser />
      </div>
    </section>
  `,
  styles: `
    .catalogo {
      padding-top: clamp(2rem, 5vw, 3.5rem);
    }
  `,
})
export default class Catalogo {}
