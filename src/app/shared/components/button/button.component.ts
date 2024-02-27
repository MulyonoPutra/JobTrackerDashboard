import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-button',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
	@Input() label!: string;
	@Input() icons?: string;
	@Input() width?: string;
	@Input() isDisabled!: boolean;
	@Output() clicked = new EventEmitter<any>();

	onClick(): void {
		this.clicked.emit();
	}
}
