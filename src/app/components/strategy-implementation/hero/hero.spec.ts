import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Hero } from './hero';

describe('StrategyImplementation Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [
        provideRouter([]),
        provideTranslateService({
          fallbackLang: 'en',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('en', {
      STRATEGY_IMPLEMENTATION: {
        HERO: {
          TITLE_PREFIX: 'Strategic Guidance for ',
          TITLE_HIGHLIGHT: 'Enterprise Growth',
          DESCRIPTION: 'Elevate your organization with expert consulting.',
          CTA_CONSULT: 'Consult Implementation',
          CTA_ROADMAP: 'Explore Roadmap',
          IMAGE_ALT: 'Strategy Implementation Hero',
        },
      },
    });
    translateService.use('en');

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the strategy hero component', () => {
    expect(component).toBeTruthy();
  });

  it('should default to defaultImage when no image input is provided', () => {
    expect(component.resolvedImage()).toBe('/images/landing/hero-image.webp');
  });

  it('should use custom image input when provided', () => {
    fixture.componentRef.setInput('image', '/images/custom-strategy.webp');
    fixture.detectChanges();

    expect(component.resolvedImage()).toBe('/images/custom-strategy.webp');
  });

  it('should fallback to fallbackImage when onImageError is triggered', () => {
    component.onImageError();
    fixture.detectChanges();

    expect(component.resolvedImage()).toBe('/images/solution/4_3.webp');
  });

  it('should render accessible section with heading and image preview', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const section = compiled.querySelector('section[aria-labelledby="strategy-hero-heading"]');
    expect(section).toBeTruthy();

    const heading = compiled.querySelector('h1#strategy-hero-heading');
    expect(heading).toBeTruthy();

    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('alt')).toBeTruthy();
  });

  it('should render primary CTA with contact-us route', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cta = compiled.querySelector('a[href="/contact-us"]');
    expect(cta).toBeTruthy();
    expect(cta?.textContent).toContain('Consult Implementation');
  });

  it('should render secondary CTA button and trigger scrollToRoadmap', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const secondaryBtn = compiled.querySelector('button[mat-stroked-button]');
    expect(secondaryBtn).toBeTruthy();
    expect(secondaryBtn?.textContent).toContain('Explore Roadmap');

    const spy = vi.spyOn(component, 'scrollToRoadmap');
    (secondaryBtn as HTMLButtonElement).click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not contain badge or chip elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-chip')).toBeFalsy();
    expect(compiled.querySelector('.badge')).toBeFalsy();
  });
});
