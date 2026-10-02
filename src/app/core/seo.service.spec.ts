import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { SeoService } from './seo.service';
import { LanguageService } from './language.service';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;
  let translateService: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideTranslateService(),
        LanguageService,
        SeoService,
      ],
    });

    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
    translateService = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update title and meta tags when updateSeo is called', () => {
    service.updateSeo({
      title: 'Test Title - PISICloud',
      description: 'Test Meta Description',
      keywords: 'test, hr, payroll',
      url: 'https://pisicloud.com/test',
    });

    expect(titleService.getTitle()).toBe('Test Title - PISICloud');
    expect(metaService.getTag("name='description'")?.content).toBe('Test Meta Description');
    expect(metaService.getTag("name='keywords'")?.content).toBe('test, hr, payroll');
    expect(metaService.getTag("property='og:title'")?.content).toBe('Test Title - PISICloud');
    expect(metaService.getTag("property='og:description'")?.content).toBe('Test Meta Description');
    expect(metaService.getTag("property='og:url'")?.content).toBe('https://pisicloud.com/test');
    expect(metaService.getTag("name='twitter:title'")?.content).toBe('Test Title - PISICloud');
  });

  it('should update document lang attribute', () => {
    service.updateDocumentLang('id');
    expect(document.documentElement.lang).toBe('id');

    service.updateDocumentLang('en');
    expect(document.documentElement.lang).toBe('en');
  });
});
