import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
	selector: 'app-form-select',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './form-select.component.html',
	styleUrls: ['./form-select.component.scss'],
	providers: [ValidationService],
})
export class FormSelectComponent {
	@Input() id!: string;
	@Input() label!: string;
	@Input() placeholder!: string;
	@Input() fieldName!: string;
	@Input() options!: any[];
	@Input() formGroup!: FormGroup;
	@Input() valueField: string = 'id';
	@Input() textField: string = 'name';

	selectedValue: any;

	constructor(private validation: ValidationService) {}

	getValue(option: any): any {
		return option[this.valueField];
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
