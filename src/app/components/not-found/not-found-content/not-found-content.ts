import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'not-found-content',
  imports: [NgOptimizedImage, MatButtonModule, RouterLink, TranslatePipe],
  templateUrl: './not-found-content.html',
})
export class NotFoundContent {}
