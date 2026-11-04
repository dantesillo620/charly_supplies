import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CatalogBrowser } from '../../catalog/catalog-browser/catalog-browser';
import { PageIntro } from '../../shared/page-intro';

@Component({
  selector: 'app-catalogo',
  imports: [PageIntro, CatalogBrowser],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-intro antetitulo="Encendedores · Pipas · Accesorios" titulo="Catálogo">
      Busca por nombre o filtra por categoría. Para conocer precio y disponibilidad, consulta cada
      producto por WhatsApp.
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
