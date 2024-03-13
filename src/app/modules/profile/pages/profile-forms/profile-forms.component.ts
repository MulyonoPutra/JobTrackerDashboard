import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CardWrapperComponent } from 'src/app/shared/components/card-wrapper/card-wrapper.component';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { FormTextareaComponent } from 'src/app/shared/components/form-textarea/form-textarea.component';
import { ToastService } from 'src/app/core/services/toast.service';
import { UserService } from 'src/app/core/services/user.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { randomAvatar } from 'src/app/core/utils/random-avatar';

@Component({
  selector: 'app-profile-forms',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    CardWrapperComponent,
    ButtonComponent,
    FormFieldComponent,
    FormsModule,
    ReactiveFormsModule,
    FormTextareaComponent
  ],
  templateUrl: './profile-forms.component.html',
  styleUrls: ['./profile-forms.component.scss'],
  providers: [UserService],
})
export class ProfileFormsComponent implements OnInit {
  form!: FormGroup;
  routeId!: string;
  randomAvatar!: string;
  user!: unknown;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly validations: ValidationService,
    private readonly location: Location,
    private readonly toastService: ToastService,
    private readonly userService: UserService
  ) {
    this.routeId = this.route.snapshot.paramMap.get('id')!;
    this.randomAvatar = randomAvatar();
    this.user = this.location.getState();
  }

  ngOnInit(): void {
    this.formInitialized();
    this.prepopulateForm(this.user)
  }

  formInitialized(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      summary: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  get formCtrlValue() {
    return {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      summary: this.form.get('summary')?.value,
      birthday: this.form.get('birthday')?.value,
      phone: this.form.get('phone')?.value,
    };
  }

  prepopulateForm(user: any): void {
    this.form.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      summary: user.summary
    });
  }

  onSubmit(): void { }
}
