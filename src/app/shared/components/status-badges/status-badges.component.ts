import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-status-badges',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './status-badges.component.html',
	styleUrls: ['./status-badges.component.scss'],
})
export class StatusBadgesComponent {
	@Input() status!: string;
}
