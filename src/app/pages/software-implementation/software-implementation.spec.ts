import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { SoftwareImplementation } from './software-implementation';

describe('SoftwareImplementation', () => {
  let component: SoftwareImplementation;
  let fixture: ComponentFixture<SoftwareImplementation>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareImplementation],
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
        PILLARS: {
          TITLE_PREFIX: 'Comprehensive Services for ',
          TITLE_HIGHLIGHT: 'Seamless Deployment',
          TITLE_SUFFIX: '',
          DESCRIPTION: 'Structured services ensure operational readiness.',
          ITEMS: {
            DATA_MIGRATION: {
              TITLE: 'Automated & Secure Data Migration',
              DESCRIPTION: 'Complete extraction, cleansing, and validation.',
            },
            CONFIGURATION: {
              TITLE: 'Custom Workflow & Policy Setup',
              DESCRIPTION: 'Tailoring complex shift rotations and approvals.',
            },
            INTEGRATION: {
              TITLE: 'Hardware & Biometric Integration',
              DESCRIPTION: 'Direct plug-and-play connectivity.',
            },
            VALIDATION: {
              TITLE: 'Parallel Runs & Rigorous UAT',
              DESCRIPTION: 'Comprehensive parallel testing.',
            },
          },
        },
        PROCESS: {
          TITLE_PREFIX: 'A Structured 4-Stage ',
          TITLE_HIGHLIGHT: 'Rollout Framework',
          TITLE_SUFFIX: '',
          DESCRIPTION: 'A proven, transparent methodology.',
          STEPS: {
            STEP_1: {
              STEP_NUMBER: '01',
              PHASE: 'Phase 01',
              TITLE: 'Discovery & Scope Audit',
              DESCRIPTION: 'In-depth workshops with your HR team.',
            },
            STEP_2: {
              STEP_NUMBER: '02',
              PHASE: 'Phase 02',
              TITLE: 'System Setup & Configuration',
              DESCRIPTION: 'Environment provisioning and hierarchy.',
            },
            STEP_3: {
              STEP_NUMBER: '03',
              PHASE: 'Phase 03',
              TITLE: 'Data Migration & Cutover',
              DESCRIPTION: 'Secure transfer of master data.',
            },
            STEP_4: {
              STEP_NUMBER: '04',
              PHASE: 'Phase 04',
              TITLE: 'Parallel Run, Go-Live & Hypercare',
              DESCRIPTION: 'Dual-system payroll run verification.',
            },
          },
        },
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

    fixture = TestBed.createComponent(SoftwareImplementation);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create page component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all child sections in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('software-implementation-hero')).toBeTruthy();
    expect(compiled.querySelector('software-implementation-pillars')).toBeTruthy();
    expect(compiled.querySelector('software-implementation-process')).toBeTruthy();
    expect(compiled.querySelector('software-implementation-guarantees')).toBeTruthy();
    expect(compiled.querySelector('universal-faq')).toBeTruthy();
    expect(compiled.querySelector('landing-companies-marquee')).toBeTruthy();
  });

  it('should not contain badge or chip elements across the page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-chip')).toBeFalsy();
    expect(compiled.querySelector('.badge')).toBeFalsy();
  });
});
