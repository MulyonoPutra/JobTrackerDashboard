import { Component, Input } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title-with-icon',
  standalone: true,
  imports: [
    CommonModule, AngularSvgIconModule
  ],
  templateUrl: './title-with-icon.component.html',
  styleUrls: [ './title-with-icon.component.scss' ],
})
export class TitleWithIconComponent {
  @Input() title!: string;
  @Input() icon!: string;
}
