import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NEGOCIO } from '../../core/business.config';
import { WHATSAPP_GENERAL } from '../../core/whatsapp';
import { CATEGORIAS } from '../../catalog/catalog.data';
import { BrandLogo } from '../../shared/brand-logo';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, BrandLogo, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly whatsapp = WHATSAPP_GENERAL;
  protected readonly horario = NEGOCIO.horario;
  /** La cinta repite los nombres de categoría (se recorta con overflow). */
  protected readonly cinta = Array.from({ length: 4 }, () =>
    CATEGORIAS.map((c) => c.nombre),
  ).flat();
}
