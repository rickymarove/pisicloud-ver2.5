import { inject, PLATFORM_ID, Service } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';
import { getFeatureBySlug } from '../data/features';

export interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Service()
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);
  private readonly languageService = inject(LanguageService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly baseUrl = 'https://pisicloud.com';
  private readonly defaultImage = 'https://pisicloud.com/images/landing/hero-image.webp';

  init(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateForCurrentRoute();
      });

    this.translate.onLangChange.subscribe((event) => {
      this.updateDocumentLang(event.lang);
      this.updateForCurrentRoute();
    });

    this.updateDocumentLang(this.languageService.getLanguage());
    this.updateForCurrentRoute();
  }

  updateDocumentLang(lang: string): void {
    if (this.document?.documentElement) {
      this.document.documentElement.lang = lang;
    }
  }

  updateForCurrentRoute(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const data = route.snapshot.data;
    const params = route.snapshot.params;
    const currentUrl = this.router.url || '/';
    const path = currentUrl.split('?')[0];

    const slug = params['slug'];
    if (slug) {
      this.setFeatureSeo(slug, path);
      return;
    }

    const seoKey = data['seoKey'] as string | undefined;
    if (seoKey && seoKey !== 'FEATURE_DETAIL') {
      const titleKey = `SEO.PAGES.${seoKey}.TITLE`;
      const descKey = `SEO.PAGES.${seoKey}.DESCRIPTION`;

      const resolvedTitle = this.translate.instant(titleKey);
      const resolvedDesc = this.translate.instant(descKey);

      this.updateSeo({
        title: resolvedTitle !== titleKey ? resolvedTitle : undefined,
        description: resolvedDesc !== descKey ? resolvedDesc : undefined,
        url: `${this.baseUrl}${path === '/' ? '' : path}`,
      });
      return;
    }

    this.updateSeo({
      url: `${this.baseUrl}${path === '/' ? '' : path}`,
    });
  }

  private setFeatureSeo(slug: string, path: string): void {
    const feature = getFeatureBySlug(slug);
    if (!feature) {
      this.updateSeo({
        url: `${this.baseUrl}${path}`,
      });
      return;
    }

    const featureName = this.translate.instant(feature.nameKey);
    const featureDesc = this.translate.instant(feature.hero.descKey);

    const title = `${featureName !== feature.nameKey ? featureName : slug} - PISICloud HRM`;
    const description =
      featureDesc !== feature.hero.descKey
        ? featureDesc
        : this.translate.instant('SEO.DEFAULT_DESCRIPTION');

    this.updateSeo({
      title,
      description,
      url: `${this.baseUrl}${path}`,
      image: feature.defaultImage
        ? `${this.baseUrl}${feature.defaultImage}`
        : this.defaultImage,
    });
  }

  updateSeo(config: SeoConfig): void {
    const defaultTitle =
      this.translate.instant('SEO.DEFAULT_TITLE') || 'PISICloud | HRD Software';
    const defaultDescription =
      this.translate.instant('SEO.DEFAULT_DESCRIPTION') ||
      'Cloud-based Attendance, Payroll, and HR software for secure, easy, and efficient employee management.';

    const pageTitle = config.title || defaultTitle;
    const pageDescription = config.description || defaultDescription;
    const canonicalUrl = config.url || this.baseUrl;
    const ogImage = config.image || this.defaultImage;
    const ogType = config.type || 'website';

    this.title.setTitle(pageTitle);

    this.meta.updateTag({ name: 'description', content: pageDescription });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    this.meta.updateTag({ property: 'og:site_name', content: 'PISICloud' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: pageDescription });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: ogType });
    this.meta.updateTag({ property: 'og:image', content: ogImage });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: pageDescription });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });

    this.updateCanonicalUrl(canonicalUrl);
  }

  private updateCanonicalUrl(url: string): void {
    if (!this.document) return;
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
