import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { TrainingImplementation } from './training-implementation';

describe('TrainingImplementation', () => {
  let component: TrainingImplementation;
  let fixture: ComponentFixture<TrainingImplementation>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingImplementation],
      providers: [
        provideRouter([]),
        provideTranslateService({
          fallbackLang: 'en',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('en', {
      TRAINING_IMPLEMENTATION: {
        HERO: {
          TITLE_PREFIX: 'Training & ',
          TITLE_HIGHLIGHT: 'Re-Implementation',
          DESCRIPTION:
            'Empower your workforce and maximize your software investment with tailored training programs and expert system re-implementation. Build confident teams, eliminate operational bottlenecks, and ensure seamless system adoption across your entire organization.',
          CTA_PRIMARY: 'Schedule a Consultation',
          IMAGE_ALT: 'PISICloud software training workshop',
        },
        OFFERINGS: {
          EYEBROW: 'Core Programs',
          TITLE_PREFIX: 'End-to-End ',
          TITLE_HIGHLIGHT: 'Implementation Excellence',
          DESCRIPTION: 'Designed to empower your workforce.',
          ITEMS: {
            TRAINING: { TITLE: 'Comprehensive Training Sessions', DESCRIPTION: 'Hands-on training tailored to workflows.' },
            REIMPLEMENTATION: { TITLE: 'Re-Implementation Support', DESCRIPTION: 'Re-evaluate and fine-tune configuration.' },
            MATERIALS: { TITLE: 'Customized Learning Materials', DESCRIPTION: 'Tailored user guides and documentation.' },
            SUPPORT: { TITLE: 'Ongoing Support and Assistance', DESCRIPTION: 'Dedicated post-implementation guidance.' },
          },
        },
        BENEFITS: {
          EYEBROW: 'Measurable Impact',
          TITLE_PREFIX: 'Key Benefits of ',
          TITLE_HIGHLIGHT: 'Training & Re-Implementation',
          DESCRIPTION: 'Achieve higher adoption.',
          ITEMS: {
            B1: { NUMBER: '01', TITLE: 'Improved Efficiency & Productivity', DESCRIPTION: 'Desc 1.' },
            B2: { NUMBER: '02', TITLE: 'Enhanced User Adoption & Satisfaction', DESCRIPTION: 'Desc 2.' },
            B3: { NUMBER: '03', TITLE: 'Reduced Errors & System Downtime', DESCRIPTION: 'Desc 3.' },
            B4: { NUMBER: '04', TITLE: 'Increased Return on Investment (ROI)', DESCRIPTION: 'Desc 4.' },
            B5: { NUMBER: '05', TITLE: 'Streamlined Processes & Cross-Collaboration', DESCRIPTION: 'Desc 5.' },
          },
          CALLOUT: {
            TITLE: "Ready to Unlock Your Software's Full Potential?",
            DESCRIPTION: 'Callout desc.',
            CTA_BUTTON: 'Talk to an Implementation Specialist',
          },
        },
      },
      UNIVERSAL: {
        FAQ: {
          TITLE_LINE_1: 'Frequently',
          TITLE_LINE_2: 'Asked',
          TITLE_HIGHLIGHT: 'Questions',
          ITEMS: {},
        },
      },
      LANDING: {
        MARQUEE: {
          TITLE: 'Trusted by 100+ Companies',
        },
      },
    });
    translateService.use('en');

    fixture = TestBed.createComponent(TrainingImplementation);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render child sections including hero, offerings, benefits, and universal faq', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('training-hero')).toBeTruthy();
    expect(compiled.querySelector('training-offerings')).toBeTruthy();
    expect(compiled.querySelector('training-benefits')).toBeTruthy();
    expect(compiled.querySelector('universal-faq')).toBeTruthy();
    expect(compiled.querySelector('landing-companies-marquee')).toBeTruthy();
  });

  it('should not render eyebrow labels for offerings or benefits', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Core Programs');
    expect(compiled.textContent).not.toContain('Measurable Impact');
  });
});
