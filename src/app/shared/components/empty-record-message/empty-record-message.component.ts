import { Component, Input } from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-empty-record-message',
	standalone: true,
	imports: [CommonModule, ButtonComponent],
	template: `
		<div class="flex h-screen flex-col items-center justify-center">
			<div class="item-center mb-4 flex justify-center text-center">
				<h1
					class="inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-3xl font-bold text-transparent">
					{{ message }}
				</h1>
			</div>
			<app-button [label]="'Create New Records'" (clicked)="onNavigate()" />
		</div>
	`,
})
export class EmptyRecordMessageComponent {
	message =
		'There are currently no records to display. Stay tuned for updates or add new data to populate this table';

	@Input() routes!: string;

	constructor(public readonly router: Router) {}

	onNavigate() {
		this.router.navigateByUrl(this.routes);
	}
}
