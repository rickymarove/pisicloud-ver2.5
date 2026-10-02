import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { ContactInfo } from './contact-info';

describe('ContactInfo', () => {
  let component: ContactInfo;
  let fixture: ComponentFixture<ContactInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactInfo],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render WhatsApp contact link and bootstrapWhatsapp icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const whatsappLink = compiled.querySelector('a[href*="wa.me/628117774744"]');
    expect(whatsappLink).toBeTruthy();

    const whatsappIcon = compiled.querySelector('ng-icon[name="bootstrapWhatsapp"]');
    expect(whatsappIcon).toBeTruthy();
  });
});
