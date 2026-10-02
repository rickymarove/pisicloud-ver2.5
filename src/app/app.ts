import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DemoVideoModal } from './components/universal/demo-video-modal/demo-video-modal';
import { DemoVideoModalService } from './components/universal/demo-video-modal/demo-video-modal.service';
import { Interested } from './components/universal/interested/interested';
import { Footer } from './components/universal/footer/footer';
import { Navbar } from './components/universal/navbar/navbar';
import { ScrollToTop } from './components/universal/scroll-to-top/scroll-to-top';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    RouterOutlet,
    DemoVideoModal,
    Interested,
    Footer,
    Navbar,
    ScrollToTop,
  ],
})
export class App {
  readonly modalService = inject(DemoVideoModalService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly isInterestedHidden = signal(false);

  constructor() {
    this.updateInterestedState();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateInterestedState();
      });
  }

  private updateInterestedState(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.isInterestedHidden.set(route.snapshot?.data?.['hideInterested'] === true);
  }
}


