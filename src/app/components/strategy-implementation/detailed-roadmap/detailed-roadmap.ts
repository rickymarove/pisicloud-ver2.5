import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapCheck2 } from '@ng-icons/bootstrap-icons';

export interface DetailedStep {
  readonly id: string;
  readonly number: string;
  readonly translationKey: string;
  readonly type: 'checklist' | 'narrative';
  readonly indices?: readonly number[];
}

export const DETAILED_STEPS: readonly DetailedStep[] = [
  {
    id: 'preparation',
    number: '01',
    translationKey: 'STRATEGY_IMPLEMENTATION.DETAILED_ROADMAP.STEPS.PREPARATION',
    type: 'checklist',
    indices: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 'blueprint',
    number: '02',
    translationKey: 'STRATEGY_IMPLEMENTATION.DETAILED_ROADMAP.STEPS.BLUEPRINT',
    type: 'narrative',
  },
  {
    id: 'realization',
    number: '03',
    translationKey: 'STRATEGY_IMPLEMENTATION.DETAILED_ROADMAP.STEPS.REALIZATION',
    type: 'narrative',
  },
  {
    id: 'final-prep',
    number: '04',
    translationKey: 'STRATEGY_IMPLEMENTATION.DETAILED_ROADMAP.STEPS.FINAL_PREP',
    type: 'checklist',
    indices: [0, 1, 2, 3, 4],
  },
  {
    id: 'go-live',
    number: '05',
    translationKey: 'STRATEGY_IMPLEMENTATION.DETAILED_ROADMAP.STEPS.GO_LIVE',
    type: 'narrative',
  },
];

@Component({
  selector:
    'strategy-detailed-roadmap, app-strategy-detailed-roadmap, app-detailed-roadmap',
  imports: [TranslatePipe, MatButtonModule, MatProgressBarModule, NgIcon],
  viewProviders: [
    provideIcons({
      bootstrapCheck2,
    }),
  ],
  templateUrl: './detailed-roadmap.html',
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    :host ::ng-deep .mat-mdc-button .mdc-button__label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      max-width: 100%;
    }
  `,
})
export class DetailedRoadmap implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly steps = DETAILED_STEPS;
  readonly activeIndex = signal<number>(0);
  readonly currentStep = computed(() => this.steps[this.activeIndex()]);

  readonly duration = 5000;
  readonly tickInterval = 40;
  readonly progress = signal<number>(0);
  readonly isPaused = signal<boolean>(false);

  private timerId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer(): void {
    this.stopTimer();
    if (isPlatformBrowser(this.platformId)) {
      this.timerId = setInterval(() => {
        if (!this.isPaused()) {
          const stepIncrement = (this.tickInterval / this.duration) * 100;
          this.progress.update((p) => {
            const next = p + stepIncrement;
            if (next >= 100) {
              this.nextStep();
              return 0;
            }
            return next;
          });
        }
      }, this.tickInterval);
    }
  }

  stopTimer(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  setActiveStep(index: number): void {
    if (index >= 0 && index < this.steps.length) {
      this.activeIndex.set(index);
      this.progress.set(0);
      this.scrollToActiveTab(index);
    }
  }

  prevStep(): void {
    const prev = (this.activeIndex() - 1 + this.steps.length) % this.steps.length;
    this.setActiveStep(prev);
  }

  nextStep(): void {
    const next = (this.activeIndex() + 1) % this.steps.length;
    this.setActiveStep(next);
  }

  scrollToActiveTab(index: number): void {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
        const tab = document.getElementById('roadmap-tab-' + index);
        if (typeof tab?.scrollIntoView === 'function') {
          tab.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          });
        }
      });
    }
  }

  pauseAutoPlay(): void {
    this.isPaused.set(true);
  }

  resumeAutoPlay(): void {
    this.isPaused.set(false);
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const next = (index + 1) % this.steps.length;
      this.setActiveStep(next);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prev = (index - 1 + this.steps.length) % this.steps.length;
      this.setActiveStep(prev);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.setActiveStep(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.setActiveStep(this.steps.length - 1);
    }
  }
}
