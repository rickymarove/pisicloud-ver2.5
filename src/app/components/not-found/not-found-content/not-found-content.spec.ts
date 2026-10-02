import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { NotFoundContent } from './not-found-content';

describe('NotFoundContent', () => {
  let component: NotFoundContent;
  let fixture: ComponentFixture<NotFoundContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundContent],
      providers: [provideRouter([]), provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand logo image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toContain('pisi-favicon.svg');
  });

  it('should render navigation CTA links for Home and Contact Us', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a');
    expect(links.length).toBeGreaterThanOrEqual(2);

    const homeLink = Array.from(links).find(
      (link) => link.getAttribute('href') === '/' || link.getAttribute('ng-reflect-router-link') === '/',
    );
    expect(homeLink).toBeTruthy();

    const contactLink = Array.from(links).find(
      (link) =>
        link.getAttribute('href') === '/contact-us' ||
        link.getAttribute('ng-reflect-router-link') === '/contact-us',
    );
    expect(contactLink).toBeTruthy();
  });
});
