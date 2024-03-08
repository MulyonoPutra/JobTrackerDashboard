import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
	selector: 'app-form-password',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, AngularSvgIconModule],
	templateUrl: './form-password.component.html',
	styleUrls: ['./form-password.component.scss'],
})
export class FormPasswordComponent {
	@Input() label!: string;
	@Input() fieldName!: string;
	@Input() placeholder?: string;
	@Input() formGroup!: FormGroup;

	passwordTextType: boolean = true;

	constructor(private validation: ValidationService) {}

	togglePasswordTextType() {
		this.passwordTextType = !this.passwordTextType;
	}

	get isInvalid() {
		const control = this.formGroup.get(this.fieldName) as FormControl;
		return this.validation.isInvalid(control);
	}

	get errorMessage(): string {
		const control = this.formGroup.get(this.fieldName) as FormControl;
		return this.validation.getErrorMessage(control);
	}
}
