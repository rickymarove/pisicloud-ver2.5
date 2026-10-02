import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Hero } from './hero';

describe('SoftwareImplementation Hero', () => {
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
      SOFTWARE_IMPLEMENTATION: {
        HERO: {
          TITLE_PREFIX: 'End-to-End ',
          TITLE_HIGHLIGHT: 'Software Implementation',
          TITLE_SUFFIX: ' for Growing Enterprises',
          DESCRIPTION: 'Seamlessly transition to PISICloud.',
          CTA_PRIMARY: 'Consult Implementation',
          CTA_SECONDARY: 'Explore Methodology',
          IMAGE_ALT: 'Hero Image Alt',
        },
      },
    });
    translateService.use('en');

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create hero component', () => {
    expect(component).toBeTruthy();
  });

  it('should render two-tone heading formula', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#software-hero-heading');
    expect(heading?.textContent).toContain('Software Implementation');
    const highlightSpan = heading?.querySelector('span.text-\\[\\#066b5b\\]');
    expect(highlightSpan?.textContent?.trim()).toBe('Software Implementation');
  });

  it('should render primary CTA with contact-us route', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cta = compiled.querySelector('a[href="/contact-us"]');
    expect(cta).toBeTruthy();
    expect(cta?.textContent).toContain('Consult Implementation');
  });

  it('should render secondary CTA button and trigger scrollToProcess', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const secondaryBtn = compiled.querySelector('button[mat-stroked-button]');
    expect(secondaryBtn).toBeTruthy();
    expect(secondaryBtn?.textContent).toContain('Explore Methodology');

    const spy = vi.spyOn(component, 'scrollToProcess');
    (secondaryBtn as HTMLButtonElement).click();
    expect(spy).toHaveBeenCalled();
  });

  it('should not contain badge or chip elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-chip')).toBeFalsy();
    expect(compiled.querySelector('.badge')).toBeFalsy();
  });
});
