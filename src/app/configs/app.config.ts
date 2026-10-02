import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { routes } from '../routes/app.routes';
import { LanguageService } from '../core/language.service';
import { SeoService } from '../core/seo.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    provideClientHydration(withEventReplay()),
    provideTranslateService({
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json',
      }),
    }),
    LanguageService,
    SeoService,
    provideAppInitializer(() => {
      const languageService = inject(LanguageService);
      const seoService = inject(SeoService);
      return firstValueFrom(
        languageService.init().pipe(
          tap(() => seoService.init()),
          catchError((err) => {
            console.error('Failed to load translations during app init', err);
            seoService.init();
            return of(null);
          }),
        ),
      );
    }),
  ],
};
