import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-confirm-dialog',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
	@Input() message: string = 'Are you sure?';
	@Output() confirmed = new EventEmitter<boolean>();

	onConfirm(): void {
		this.confirmed.emit(true);
	}

	onCancel(): void {
		this.confirmed.emit(false);
	}
}
