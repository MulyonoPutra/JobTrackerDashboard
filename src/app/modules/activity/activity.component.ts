import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet
  ],
  template: `<router-outlet></router-outlet>`,
})
export class ActivityComponent {}
