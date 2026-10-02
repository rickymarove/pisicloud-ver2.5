import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Guarantees } from './guarantees';

describe('SoftwareImplementation Guarantees', () => {
  let component: Guarantees;
  let fixture: ComponentFixture<Guarantees>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guarantees],
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
        GUARANTEES: {
          TITLE_PREFIX: 'Why Enterprises Choose ',
          TITLE_HIGHLIGHT: 'PISICloud Implementation',
          TITLE_SUFFIX: '',
          DESCRIPTION: 'We combine decades of HR domain expertise.',
          ITEMS: {
            NO_DOWNTIME: {
              NUMBER: '01',
              TITLE: 'Zero Business Interruption',
              DESCRIPTION: 'Your daily operations run continuously.',
            },
            SECURITY: {
              NUMBER: '02',
              TITLE: 'Bank-Grade Security & Integrity',
              DESCRIPTION: 'End-to-end data encryption.',
            },
            SPECIALIST: {
              NUMBER: '03',
              TITLE: 'Dedicated Implementation Lead',
              DESCRIPTION: 'A certified HR system specialist is assigned.',
            },
            LOCAL_COMPLIANCE: {
              NUMBER: '04',
              TITLE: '100% Indonesian Regulatory Compliance',
              DESCRIPTION: 'Pre-configured for labor regulations.',
            },
          },
          CALLOUT: {
            TITLE: 'Ready for a Seamless Software Rollout?',
            DESCRIPTION: 'Schedule a discovery session.',
            CTA_BUTTON: 'Talk to an Implementation Specialist',
          },
        },
      },
    });
    translateService.use('en');

    fixture = TestBed.createComponent(Guarantees);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create guarantees component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 guarantee items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('#guarantees h3');
    // 4 items + 1 callout heading = 5 h3 elements
    expect(items.length).toBe(5);
    expect(items[0].textContent).toContain('Zero Business Interruption');
    expect(items[1].textContent).toContain('Bank-Grade Security & Integrity');
    expect(items[2].textContent).toContain('Dedicated Implementation Lead');
    expect(items[3].textContent).toContain('100% Indonesian Regulatory Compliance');
  });

  it('should render callout button leading to contact-us', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cta = compiled.querySelector('a[href="/contact-us"]');
    expect(cta).toBeTruthy();
    expect(cta?.textContent).toContain('Talk to an Implementation Specialist');
  });

  it('should not contain badge or chip elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-chip')).toBeFalsy();
    expect(compiled.querySelector('.badge')).toBeFalsy();
  });
});
