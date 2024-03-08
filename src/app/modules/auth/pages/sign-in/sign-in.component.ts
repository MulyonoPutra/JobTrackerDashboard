import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { take, timer } from 'rxjs';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Login } from 'src/app/core/models/login';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf],
	providers: [ValidationService, AuthService],
})
export class SignInComponent implements OnInit {
	form!: FormGroup;
	submitted = false;
	passwordTextType!: boolean;

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _router: Router,
		private readonly _authService: AuthService,
		private readonly _localStorageService: LocalStorageService,
		private readonly _validation: ValidationService,
		private readonly _toastService: ToastService
	) {}

	ngOnInit(): void {
		this.form = this._formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}

	get f() {
		return this.form.controls;
	}

	togglePasswordTextType() {
		this.passwordTextType = !this.passwordTextType;
	}

	get formCtrlValue(): Login {
		return {
			email: this.form.get('email')?.value,
			password: this.form.get('password')?.value,
		};
	}

	onSubmit() {
		this.submitted = true;
		if (this.form.valid) {
			this._authService.login(this.formCtrlValue).subscribe({
				next: () => {},
				error: (error: HttpErrorResponse) => {
					this.errorMessage(error);
				},
				complete: () => {
					this._toastService.showSuccess('Success!', 'logged in successfully');
					this.navigateAfterSucceed();
				},
			});
		} else {
			this._validation.markAllFormControlsAsTouched(this.form);
		}
	}

	navigateAfterSucceed(): void {
		timer(1000)
			.pipe(take(1))
			.subscribe(() => this._router.navigateByUrl('/activities/collections'));
	}

	private errorMessage(error: HttpErrorResponse) {
		this._toastService.showError('Error!', error.message);
	}
}
