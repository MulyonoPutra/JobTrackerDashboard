import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { FormTextareaComponent } from 'src/app/shared/components/form-textarea/form-textarea.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/core/services/toast.service';
import { UpdateExperienceDto } from 'src/app/core/models/dto/update-experience.dto';
import { User } from 'src/app/core/models/user';
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

  private destroyed = new Subject();

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
        next: (response) => {
          this.user = response;
          this.experienceForm = this.fb.group({
            experience: this.fb.array(
              this.user.experience.map((x: any) =>
                this.fb.group({
                  location: [x.location],
                  position: [x.position],
                })
              )
            )
          });
        },
        error: (error: HttpErrorResponse) => {

        },
        complete: () => { },
      });
  }

  buildJustificationFields(x: any): FormGroup {
    return new FormGroup({
      location: new FormControl(x.location),
      position: new FormControl(x.position),
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
