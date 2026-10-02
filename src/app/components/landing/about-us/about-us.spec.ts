import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { AboutUsComponent } from './about-us';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsComponent],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('en', {
      LANDING: {
        ABOUT_US: {
          TITLE_LINE_1: 'A unified',
          TITLE_HIGHLIGHT_1: 'architecture',
          TITLE_LINE_2: 'for modern workforce',
          TITLE_HIGHLIGHT_2: 'management',
          TITLE_DOT: '.',
          DESCRIPTION:
            'Break down silos with a seamlessly integrated suite designed to handle the complexity of global operations.',
          IMAGE_ALT: 'PISICloud responsive system interface on laptop, tablet, and mobile',
        },
      },
    });
    translateService.use('en');

    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main heading text correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h2');
    expect(heading?.textContent).toContain('A unified architecture for modern workforce management.');
  });

  it('should render the paragraph description correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const paragraph = compiled.querySelector('p');
    expect(paragraph?.textContent).toContain('Break down silos with a seamlessly integrated suite');
  });
});