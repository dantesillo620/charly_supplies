import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page">
      <h1>Contacto</h1>
      <p>Escríbenos para cotizaciones y pedidos.</p>
    </section>
  `,
})
export default class Contacto {}
