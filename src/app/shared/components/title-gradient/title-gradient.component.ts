import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title-gradient',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './title-gradient.component.html',
  styleUrls: ['./title-gradient.component.scss'],
})
export class TitleGradientComponent {
  @Input() title!: string;
  @Input({ required: true }) size  = 'text-sm' || 'text-base' || 'text-lg' || 'text-xl' || 'text-2xl'
}
