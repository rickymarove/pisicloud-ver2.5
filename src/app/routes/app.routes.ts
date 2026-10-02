import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { seoKey: 'LANDING' },
    loadComponent: () => import('../pages/landing/landing').then((m) => m.Landing),
  },
  {
    path: 'feature',
    data: { seoKey: 'FEATURE' },
    loadComponent: () => import('../pages/feature/feature').then((m) => m.Feature),
  },
  {
    path: 'about-pisi',
    data: { seoKey: 'ABOUT_PISI' },
    loadComponent: () => import('../pages/about-pisi/about-pisi').then((m) => m.AboutPisi),
  },
  {
    path: 'our-customers',
    data: { seoKey: 'OUR_CUSTOMERS' },
    loadComponent: () => import('../pages/our-customers/our-customers').then((m) => m.OurCustomers),
  },
  {
    path: 'strategy-implementation',
    data: { seoKey: 'STRATEGY_IMPLEMENTATION' },
    loadComponent: () =>
      import('../pages/strategy-implementation/strategy-implementation').then(
        (m) => m.StrategyImplementation,
      ),
  },
  {
    path: 'software-implementation',
    data: { seoKey: 'SOFTWARE_IMPLEMENTATION' },
    loadComponent: () =>
      import('../pages/software-implementation/software-implementation').then(
        (m) => m.SoftwareImplementation,
      ),
  },
  {
    path: 'training-implementation',
    data: { seoKey: 'TRAINING_IMPLEMENTATION' },
    loadComponent: () =>
      import('../pages/training-implementation/training-implementation').then(
        (m) => m.TrainingImplementation,
      ),
  },
  {
    path: 'training-re-implementation',
    redirectTo: 'training-implementation',
    pathMatch: 'full',
  },
  {
    path: 'contact-us',
    data: { seoKey: 'CONTACT_US' },
    loadComponent: () => import('../pages/contact-us/contact-us').then((m) => m.ContactUs),
  },
  {
    path: 'customize-module',
    data: { seoKey: 'CUSTOMIZE_MODULE' },
    loadComponent: () =>
      import('../pages/customize-module/customize-module').then((m) => m.CustomizeModule),
  },
  {
    path: 'feature/:slug',
    data: { seoKey: 'FEATURE_DETAIL' },
    loadComponent: () => import('../pages/feature/feature').then((m) => m.Feature),
  },
  {
    path: '404',
    data: { seoKey: 'NOT_FOUND', hideInterested: true },
    loadComponent: () => import('../pages/not-found/not-found').then((m) => m.NotFound),
  },
  {
    path: '**',
    data: { seoKey: 'NOT_FOUND', hideInterested: true },
    loadComponent: () => import('../pages/not-found/not-found').then((m) => m.NotFound),
  },
];
