import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { take, timer } from 'rxjs';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormCheckboxComponent } from 'src/app/shared/components/form-checkbox/form-checkbox.component';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { FormPasswordComponent } from 'src/app/shared/components/form-password/form-password.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Register } from 'src/app/core/models/register';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLink,
    AngularSvgIconModule,
    NgClass,
    NgIf,
    FormFieldComponent,
    FormPasswordComponent,
    FormCheckboxComponent
  ],
  providers: [ValidationService, AuthService]
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private readonly _validation: ValidationService,
    private readonly _toastService: ToastService) { }

  ngOnInit(): void {
    this.initForms();
  }

  initForms(): void {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue],
    }, { validator: this._validation.passwordMatchValidator });
  }

  get formCtrlValue(): Register {
    return {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this._authService.register(this.formCtrlValue).subscribe({
        next: () => { },
        error: (error: HttpErrorResponse) => {
          this.errorMessage(error);
        },
        complete: () => {
          this._toastService.showSuccess('Success!', 'Register successfully')
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
      .subscribe(() => this._router.navigateByUrl('/auth/sign-in'));
  }

  private errorMessage(error: HttpErrorResponse) {
    this._toastService.showError('Error!', error.message);
  }
}
