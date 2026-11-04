import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { buildBusinessSchema } from '../../core/seo/business-schema';
import { SeoService } from '../../core/seo/seo.service';
import { Categories } from '../../sections/categories/categories';
import { ContactSection } from '../../sections/contact/contact-section';
import { Featured } from '../../sections/featured/featured';
import { Hero } from '../../sections/hero/hero';

@Component({
  selector: 'app-home',
  imports: [Hero, Categories, Featured, ContactSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-categories />
    <!-- Se prerenderiza completo; su JavaScript se hidrata al acercarse a la pantalla -->
    @defer (hydrate on viewport) {
      <app-featured />
    }
    @defer (hydrate on viewport) {
      <app-contact-section [enlaceCatalogo]="true" />
    }
  `,
})
export default class Home implements OnDestroy {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setJsonLd('business', buildBusinessSchema());
  }

  ngOnDestroy(): void {
    this.seo.setJsonLd('business', null);
  }
}
