import { Component } from '@angular/core';
import { NotFoundContent } from '../../components/not-found/not-found-content/not-found-content';

@Component({
  selector: 'app-not-found',
  imports: [NotFoundContent],
  templateUrl: './not-found.html',
})
export class NotFound {}
