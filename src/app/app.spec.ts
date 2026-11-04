import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the site name in the header', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('Charly Supplies');
  });

  it('should link the header button to WhatsApp with an encoded message', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const href = (fixture.nativeElement as HTMLElement).querySelector<HTMLAnchorElement>(
      '.cta',
    )?.href;
    expect(href).toContain('https://wa.me/523320700734?text=');
    expect(decodeURIComponent(href!.split('text=')[1])).toBe(
      'Hola, vi el catálogo de Charly Supplies y me gustaría recibir información sobre sus accesorios.',
    );
  });
});
