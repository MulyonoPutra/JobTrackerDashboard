import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-collections',
  standalone: true,
  imports: [
	CommonModule,
  ],
  templateUrl: './card-collections.component.html',
  styleUrls: [ './card-collections.component.scss' ],
})
export class CardCollectionsComponent {
  @Input() title!: string;
}
