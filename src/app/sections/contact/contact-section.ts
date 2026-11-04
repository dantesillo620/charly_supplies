import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NEGOCIO } from '../../core/business.config';
import { WHATSAPP_GENERAL } from '../../core/whatsapp';
import { BrandLogo } from '../../shared/brand-logo';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

/**
 * Bloque de contacto. Solo muestra los datos configurados en business.config.ts:
 * dirección e Instagram aparecen únicamente cuando dejan de ser `null`.
 */
@Component({
  selector: 'app-contact-section',
  imports: [RouterLink, BrandLogo, Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
})
export class ContactSection {
  /** Nivel del título: 'h1' en la página de contacto, 'h2' en la portada. */
  readonly nivel = input<'h1' | 'h2'>('h2');
  /** Muestra el enlace al catálogo (útil fuera de la portada). */
  readonly enlaceCatalogo = input(false);

  protected readonly negocio = NEGOCIO;
  protected readonly whatsapp = WHATSAPP_GENERAL;
}
