import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Toast } from 'src/app/core/models/toast';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
	selector: 'app-alert',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
	toasts: Toast[] = [];

	constructor(public toastService: ToastService) {
		toastService.toasts$.subscribe((toasts) => (this.toasts = toasts));
	}

	remove(index: number) {
		this.toastService.remove(index);
	}
}

/*
Reference:
- https://stackblitz.com/edit/angular-toast-alert?file=app%2Fapp.component.html,app%2Fapp.component.ts
- https://stackblitz.com/edit/angular-toast-observable-service?file=src%2Fapp%2Fservice%2Ftoast.service.tssrc%2Fapp%2Fapp.component.ts
*/
