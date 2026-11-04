import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIAS, contarPorCategoria } from '../../catalog/catalog.data';
import { Icon } from '../../shared/icon';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  protected readonly categorias = CATEGORIAS.map((c) => ({
    ...c,
    proximamente: contarPorCategoria(c.id) === 0,
  }));
}
