import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NEGOCIO } from '../../core/business.config';
import { WHATSAPP_GENERAL } from '../../core/whatsapp';
import { BrandLogo } from '../../shared/brand-logo';
import { Icon } from '../../shared/icon';
import { NAVEGACION } from '../nav';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, BrandLogo, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  protected readonly negocio = NEGOCIO;
  protected readonly nav = NAVEGACION;
  protected readonly whatsapp = WHATSAPP_GENERAL;
  protected readonly anio = new Date().getFullYear();
}
