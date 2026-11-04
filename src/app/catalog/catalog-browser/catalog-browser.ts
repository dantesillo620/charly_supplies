import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WHATSAPP_GENERAL } from '../../core/whatsapp';
import { Icon } from '../../shared/icon';
import { CATEGORIAS, HAY_EJEMPLOS, PRODUCTOS_VISIBLES, esCategoria } from '../catalog.data';
import { CategoriaId } from '../catalog.models';
import { ProductGrid } from '../product-grid/product-grid';

/** Quita acentos y mayúsculas para que "encendedor" encuentre "Encendédor". */
function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

@Component({
  selector: 'app-catalog-browser',
  imports: [ProductGrid, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalog-browser.html',
  styleUrl: './catalog-browser.scss',
})
export class CatalogBrowser {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly categorias = CATEGORIAS;
  protected readonly hayEjemplos = HAY_EJEMPLOS;
  protected readonly catalogoVacio = PRODUCTOS_VISIBLES.length === 0;
  protected readonly whatsapp = WHATSAPP_GENERAL;

  protected readonly busqueda = signal('');
  protected readonly categoria = signal<CategoriaId | null>(null);

  protected readonly conteo = computed(() => {
    const porCategoria = new Map<CategoriaId, number>();
    for (const p of PRODUCTOS_VISIBLES) {
      porCategoria.set(p.categoria, (porCategoria.get(p.categoria) ?? 0) + 1);
    }
    return porCategoria;
  });

  protected readonly resultados = computed(() => {
    const termino = normalizar(this.busqueda());
    const cat = this.categoria();
    return PRODUCTOS_VISIBLES.filter(
      (p) => (!cat || p.categoria === cat) && (!termino || normalizar(p.nombre).includes(termino)),
    );
  });

  protected readonly resumen = computed(() => {
    const n = this.resultados().length;
    return n === 1 ? '1 producto' : `${n} productos`;
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    // La categoría de la URL (?categoria=pipas) se aplica en el navegador, después
    // de la hidratación, para que coincida con el HTML prerenderizado.
    afterNextRender(() => {
      const sub = this.route.queryParamMap.subscribe((params) => {
        const valor = params.get('categoria');
        this.categoria.set(esCategoria(valor) ? valor : null);
      });
      destroyRef.onDestroy(() => sub.unsubscribe());
    });
  }

  protected elegirCategoria(id: CategoriaId | null): void {
    this.categoria.set(id);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { categoria: id },
      replaceUrl: true,
      preserveFragment: true,
    });
  }

  protected alBuscar(evento: Event): void {
    this.busqueda.set((evento.target as HTMLInputElement).value);
  }

  protected limpiar(campo: HTMLInputElement): void {
    this.busqueda.set('');
    this.elegirCategoria(null);
    campo.focus();
  }
}
