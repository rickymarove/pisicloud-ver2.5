import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { CustomersLogoGrid } from './logo-grid';

describe('CustomersLogoGrid', () => {
  let component: CustomersLogoGrid;
  let fixture: ComponentFixture<CustomersLogoGrid>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersLogoGrid],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);

    translateService.setTranslation('en', {
      OUR_CUSTOMERS: {
        LOGO_GRID: {
          TITLE_PREFIX: 'PISICloud ',
          TITLE_HIGHLIGHT: 'Customer',
          TITLE_SUFFIX: ' Ecosystem',
          SUBTITLE:
            'Trusted by industry leaders across manufacturing, hospitality, engineering, electronics, and commercial enterprises.',
        },
      },
    });
    translateService.use('en');

    fixture = TestBed.createComponent(CustomersLogoGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with all 46 partner logos', () => {
    expect(component.allLogos.length).toBe(46);
  });

  it('should render the two-tone heading formula and subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h2#client-directory-heading');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('PISICloud');
    expect(heading?.textContent).toContain('Customer');
    expect(heading?.textContent).toContain('Ecosystem');

    const highlightSpan = heading?.querySelector('span.text-\\[\\#066b5b\\]');
    expect(highlightSpan?.textContent?.trim()).toBe('Customer');

    const subtitle = compiled.querySelector('p');
    expect(subtitle?.textContent).toContain('Trusted by industry leaders');
  });

  it('should not render client portfolio badge, search bar, or count badge', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[type="text"]')).toBeNull();
    expect(compiled.textContent).not.toContain('CLIENT PORTFOLIO');
    expect(compiled.textContent).not.toContain('Enterprise Partners');
  });

  it('should render all 46 partner logo cards in the grid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('[role="listitem"]');
    expect(items.length).toBe(46);

    const firstImg = items[0].querySelector('img');
    expect(firstImg).toBeTruthy();
    expect(firstImg?.getAttribute('src')).toBe('/images/companies/1.webp');
    expect(firstImg?.getAttribute('draggable')).toBe('false');
  });

  it('should render non-clickable <div> cards for all client logos without external links or redirects', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const allItems = compiled.querySelectorAll('[role="listitem"]');
    expect(allItems.length).toBe(46);

    const linkCards = compiled.querySelectorAll('a[role="listitem"]');
    expect(linkCards.length).toBe(0);

    for (const item of Array.from(allItems)) {
      expect(item.tagName.toLowerCase()).toBe('div');
      expect(item.getAttribute('href')).toBeNull();
      expect(item.getAttribute('target')).toBeNull();
      expect(item.classList.contains('cursor-default')).toBe(true);
    }
  });

  it('should render logos with full color on mobile and monochrome on desktop (md+)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstImg = compiled.querySelector('[role="listitem"] img');
    expect(firstImg).toBeTruthy();

    const classes = firstImg?.getAttribute('class') || '';
    expect(classes).toContain('grayscale-0');
    expect(classes).toContain('opacity-100');
    expect(classes).toContain('md:grayscale');
    expect(classes).toContain('md:opacity-75');
    expect(classes).toContain('group-hover:grayscale-0');
    expect(classes).toContain('group-hover:opacity-100');
  });
});
