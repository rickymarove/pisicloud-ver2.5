import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapEnvelopeFill,
  bootstrapLink45deg,
  bootstrapTelephoneFill,
  bootstrapWhatsapp,
  bootstrapClockFill,
  bootstrapGeoAltFill,
} from '@ng-icons/bootstrap-icons';
import { tablerArrowUpRight } from '@ng-icons/tabler-icons';

@Component({
  selector: 'contact-us-info',
  imports: [TranslatePipe, NgIcon],
  viewProviders: [
    provideIcons({
      bootstrapEnvelopeFill,
      bootstrapLink45deg,
      bootstrapTelephoneFill,
      bootstrapWhatsapp,
      bootstrapClockFill,
      bootstrapGeoAltFill,
      tablerArrowUpRight,
    }),
  ],
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.css',
})
export class ContactInfo {}
