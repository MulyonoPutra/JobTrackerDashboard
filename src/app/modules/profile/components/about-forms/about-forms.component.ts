import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AccordionComponent } from 'src/app/shared/components/accordion/accordion.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CalendarComponent } from 'src/app/shared/components/calendar/calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { CardWrapperComponent } from 'src/app/shared/components/card-wrapper/card-wrapper.component';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { FormTextareaComponent } from 'src/app/shared/components/form-textarea/form-textarea.component';
import { HttpErrorResponse } from '@angular/common/http';
import { TitleWithIconComponent } from 'src/app/shared/components/title-with-icon/title-with-icon.component';
import { ToastService } from 'src/app/core/services/toast.service';
import { UpdateUserDto } from 'src/app/core/models/dto/update-user.dto';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { randomAvatar } from 'src/app/core/utils/random-avatar';

@Component({
  selector: 'app-about-forms',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    CardWrapperComponent,
    ButtonComponent,
    FormFieldComponent,
    FormsModule,
    ReactiveFormsModule,
    FormTextareaComponent,
    AccordionComponent,
    DatepickerComponent,
    TitleWithIconComponent,
    CalendarModule,
    CalendarComponent

  ],
  templateUrl: './about-forms.component.html',
  styleUrls: ['./about-forms.component.scss'],
  providers: [UserService],
})
export class AboutFormsComponent implements OnInit, OnDestroy {
  profileForm!: FormGroup;
  routeId!: string;
  randomAvatar!: string;
  user!: User | unknown;

  private destroyed = new Subject();

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
    // this.user = this.location.getState();
  }

  ngOnInit(): void {
    this.profileFormInit();
    this.findOne();

  }

  findOne(): void {
    this.userService
      .findUser()
      .subscribe({
        next: (response) => {
          this.user = response;
          this.prepopulateProfileForm(this.user)
        },
        error: (error: HttpErrorResponse) => {

        },
        complete: () => { },
      });
  }

  profileFormInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      summary: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  get profileFormCtrlValue(): UpdateUserDto {
    return {
      name: this.profileForm.get('name')?.value,
      email: this.profileForm.get('email')?.value,
      summary: this.profileForm.get('summary')?.value,
      birthday: this.profileForm.get('birthday')?.value,
      phone: this.profileForm.get('phone')?.value,
    };
  }

  prepopulateProfileForm(user: any) {
    this.profileForm.patchValue({
      name: user.name,
      email: user.email,
      summary: user.summary,
      birthday: new Date(user.birthday),
      phone: user.phone,
    });
  }

  onBirthdaySelected(selectedDate: string) {
    this.profileForm.patchValue({
      birthday: selectedDate,
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.onUpdate();
    }
  }

  onUpdate(): void {
    console.log(this.profileForm.value);
    this.userService
      .updateProfile(this.profileFormCtrlValue)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: () => {
          this.toastService.showSuccess('Success!', 'Successfully updated!');
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showError('Error!', error.message);
        },
        complete: () => {
          this.goBack();
        },
      });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
