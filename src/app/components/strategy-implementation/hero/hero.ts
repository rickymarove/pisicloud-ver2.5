import { Component, computed, inject, input, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapShieldCheck,
  bootstrapCheckCircleFill,
  bootstrapTelephoneFill,
} from '@ng-icons/bootstrap-icons';
import { tablerArrowRight, tablerArrowDown } from '@ng-icons/tabler-icons';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'strategy-hero, app-strategy-hero, app-hero',
  imports: [NgOptimizedImage, RouterLink, MatButtonModule, NgIcon, TranslatePipe],
  viewProviders: [
    provideIcons({
      bootstrapShieldCheck,
      bootstrapCheckCircleFill,
      bootstrapTelephoneFill,
      tablerArrowRight,
      tablerArrowDown,
    }),
  ],
  templateUrl: './hero.html',
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
})
export class Hero {
  private readonly platformId = inject(PLATFORM_ID);
  readonly image = input<string | undefined>(undefined);
  readonly hasImageError = signal<boolean>(false);

  readonly defaultImage = '/images/landing/hero-image.webp';
  readonly fallbackImage = '/images/solution/4_3.webp';

  readonly resolvedImage = computed<string>(() => {
    if (this.hasImageError()) {
      return this.fallbackImage;
    }
    return this.image() || this.defaultImage;
  });

  onImageError(): void {
    this.hasImageError.set(true);
  }

  scrollToRoadmap(): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById('roadmap');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
