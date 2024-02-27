import { Component, Input } from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-record-message',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent
  ],
  template: `
    <div class="flex flex-col items-center justify-center h-screen">
      <div class="item-center flex justify-center text-center mb-4">
          <h1
        class="text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
        {{ message}}
      </h1>
      </div>
      <app-button [label]="'Create New Records'" (clicked)="onNavigate()" />
    </div>
  `,
})
export class EmptyRecordMessageComponent {

  message = 'There are currently no records to display. Stay tuned for updates or add new data to populate this table'

  @Input() routes!: string;

  constructor(public readonly router: Router) {}

  onNavigate() {
    this.router.navigateByUrl(this.routes);
  }
}
