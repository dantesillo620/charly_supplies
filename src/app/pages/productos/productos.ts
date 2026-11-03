import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page">
      <h1>Productos</h1>
      <p>Nuestro catálogo de productos.</p>
    </section>
  `,
})
export default class Productos {}
