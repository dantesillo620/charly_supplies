import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactSection } from '../../sections/contact/contact-section';

@Component({
  selector: 'app-contacto',
  imports: [ContactSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-contact-section nivel="h1" [enlaceCatalogo]="true" />`,
})
export default class Contacto {}
