import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { FormTextareaComponent } from 'src/app/shared/components/form-textarea/form-textarea.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-experience-forms',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    ButtonComponent,
    FormFieldComponent,
    FormsModule,
    ReactiveFormsModule,
    FormTextareaComponent,
  ],
  templateUrl: './experience-forms.component.html',
  styleUrls: ['./experience-forms.component.scss'],
  providers: [UserService],
})
export class ExperienceFormsComponent implements OnInit, OnDestroy {
  experienceForm!: FormGroup;
  routeId!: string;
  randomAvatar!: string;
  user!: any;
  isDisabled = false;

  private destroyed = new Subject();

  @Input() isAboutFormOpen!: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly toastService: ToastService,
    private readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.findOne();
  }

  findOne(): void {
    this.userService
      .findUser()
      .subscribe({
        next: (user) => {
          this.experienceForm = this.fb.group({
            experience: this.fb.array(
              user.experience.map((x: any) =>
                this.initFormGroup(x)
              )
            )
          });
        },
        error: (error: HttpErrorResponse) => { },
        complete: () => { },
      });
  }

  private initFormGroup(data: any) {
    return this.fb.group({
      location: this.fb.control({ value: data.location, disabled: false }),
      position: this.fb.control({ value: data.position, disabled: false }),
    });
  }

  createExperienceField(): FormGroup {
    return this.fb.group({
      location: '',
      position: '',
    });
  }

  onSubmit(): void {
    if (this.experienceForm.valid) {
      // this.onUpdate();
    }
  }

  get experienceFormArray() {
    return this.experienceForm.get('experience') as FormArray;
  }

  experienceFormGroupIndex(index: number): FormGroup {
    return (this.experienceForm.get('experience') as FormArray).at(index) as FormGroup;
  }

  addNewForms(): void { }

  // onUpdate(): void {
  //   this.userService
  //     .updateProfile(this.experienceFormCtrlValue)
  //     .pipe(takeUntil(this.destroyed))
  //     .subscribe({
  //       next: () => {
  //         this.toastService.showSuccess('Success!', 'Successfully updated!');
  //       },
  //       error: (error: HttpErrorResponse) => {
  //         this.toastService.showError('Error!', error.message);
  //       },
  //       complete: () => {
  //         this.goBack();
  //       },
  //     });
  // }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}

/**
Form Array resource:
- https://stackblitz.com/edit/get-data-from-api-and-populate-form-array-with-it-8tihsz?file=src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fapp.component.html
- https://stackblitz.com/edit/angular-prepopulate-dynamic-reactive-form-array-wsbcq6?file=src%2Fapp%2Fapp.component.ts
- https://stackblitz.com/edit/angular-form-array-add-remove-group-update-value-tgju6a?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.ts
- https://stackblitz.com/edit/form-array-angular?file=src%2Fapp%2Fapp.component.ts
*/
