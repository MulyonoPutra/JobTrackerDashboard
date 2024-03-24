import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
	selector: 'app-form-textarea',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './form-textarea.component.html',
	styleUrls: ['./form-textarea.component.scss'],
})
export class FormTextareaComponent {
	@Input() label!: string;
	@Input() fieldName!: string;
	@Input() formGroup!: FormGroup;
	@Input() isDisabled!: FormGroup;

	constructor(private validation: ValidationService) {}

	get isInvalid() {
		const control = this.formGroup.get(this.fieldName) as FormControl;
		return this.validation.isInvalid(control);
	}

	get errorMessage(): string {
		const control = this.formGroup.get(this.fieldName) as FormControl;
		return this.validation.getErrorMessage(control);
	}

	get classLabel() {
		return {
			'label-valid': !this.isInvalid,
			'label-invalid': this.isInvalid,
		};
	}

	get classFilled(): { [key: string]: boolean } {
		const isFilled = this.formGroup.get(this.fieldName)?.value !== '';
		return { 'p-filled': isFilled };
	}
}
