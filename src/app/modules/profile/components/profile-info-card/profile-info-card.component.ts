import { Component, Input } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { TextOverflowPipe } from 'src/app/shared/pipes/text-overflow.pipe';

@Component({
  selector: 'app-profile-info-card',
  standalone: true,
  imports: [
    CommonModule, AngularSvgIconModule, TextOverflowPipe
  ],
  templateUrl: './profile-info-card.component.html',
  styleUrls: ['./profile-info-card.component.scss'],
})
export class ProfileInfoCardComponent {
  @Input() title!: string;
  @Input() data!: any;
  @Input() icon!: string;
}
