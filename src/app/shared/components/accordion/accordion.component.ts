import { Component, Input } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [
    CommonModule, AngularSvgIconModule
  ],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {

  openPanel: boolean = false;
  @Input() title!: string;

  toggle(): void {
    this.openPanel = !this.openPanel;
  }
}
