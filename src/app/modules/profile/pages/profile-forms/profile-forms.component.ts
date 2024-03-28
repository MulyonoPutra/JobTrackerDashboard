import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';
import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, find, takeUntil } from 'rxjs';

import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CalendarComponent } from 'src/app/shared/components/calendar/calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { CreateExperienceDto } from 'src/app/core/dto/create-experience.dto';
import { EditorModule } from 'primeng/editor';
import { Experience } from 'src/app/core/models/experience';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { FormTextareaComponent } from 'src/app/shared/components/form-textarea/form-textarea.component';
import { HttpErrorResponse } from '@angular/common/http';
import { TitleWithIconComponent } from 'src/app/shared/components/title-with-icon/title-with-icon.component';
import { ToastService } from 'src/app/core/services/toast.service';
import { UpdateExperienceDto } from 'src/app/core/models/dto/update-experience.dto';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile-forms',
  standalone: true,
  imports: [
    FormsModule,
    EditorModule,
    CommonModule,
    CalendarModule,
    ReactiveFormsModule,

    ButtonComponent,
    CalendarComponent,
    FormFieldComponent,
    FormTextareaComponent,
    TitleWithIconComponent,
  ],
  templateUrl: './profile-forms.component.html',
  styleUrls: ['./profile-forms.component.scss'],
  providers: [UserService, SvgIconRegistryService],
})
export class ProfileFormsComponent implements OnInit, OnDestroy {
  private destroyed = new Subject();
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<any>();

  form!: FormGroup;
  updateForm!: FormGroup;

  ref!: DynamicDialogRef;

  isEmpty!: boolean;
  experienceId!: string;

  constructor(
    private readonly location: Location,
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly toastService: ToastService,) { }

  ngOnInit(): void {
    this.isEmpty = this.config.data.isEmpty;
    if (this.isEmpty) {
      this.formArrayInitialized();

    } else {
      this.updateFormInitializated()
      this.findExperienceById();
    }
  }

  findExperienceById(): void {
    this.experienceId = this.config.data.id;
    if (this.experienceId) {
      this.userService.findExperience(this.experienceId).subscribe({
        next: (data: Experience) => {
          this.updateFormPrepopulated(data)

          this.form = this.fb.group({
            experience: this.prepopulateForms(data)
          })
        },
      })
    }
  }

  formArrayInitialized(): void {
    this.form = this.fb.group({
      experience: this.fb.array([this.experienceFormGroup()]),
    });
  }

  updateFormInitializated(): void {
    this.updateForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      position: ['', Validators.required],
      location: ['', Validators.required],
      company: ['', Validators.required],
      responsibilities: ['', Validators.required],
    })
  }

  protected updateFormPrepopulated(data: any): void {
    this.updateForm.patchValue({
      startDate: this.convertDate(data.startDate),
      endDate: this.convertDate(data.endDate),
      position: data.position,
      location: data.location,
      company: data.company,
      responsibilities: data.responsibilities,
    });
  }

  experienceFormGroup(): FormGroup {
    return this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      position: ['', Validators.required],
      location: ['', Validators.required],
      company: ['', Validators.required],
      responsibilities: ['', Validators.required],
    });
  }

  private prepopulateForms(data: any): FormGroup {
    return this.fb.group({
      startDate: [{ value: this.convertDate(data.startDate), disabled: false }],
      endDate: [{ value: this.convertDate(data.endDate), disabled: false }],
      position: [{ value: data.position, disabled: false }],
      location: [{ value: data.location, disabled: false }],
      company: [{ value: data.company, disabled: false }],
      responsibilities: [{ value: data.responsibilities, disabled: false }],
    });
  }

  private convertDate(date: string): Date {
    return new Date(date);
  }

  get experienceFormArray(): FormArray {
    return this.form.get('experience')! as FormArray;
  }

  get newFormValue(): CreateExperienceDto[] {
    return this.form.value.experience;
  }

  get updatedFormValue(): CreateExperienceDto {
    return this.updateForm.value;
  }

  get experienceFormGroupValue(): UpdateExperienceDto {
    return this.form.value.experience.find((exp: UpdateExperienceDto) => exp);
  }

  experienceFormGroupIndex(index: number): FormGroup {
    const experiences = this.form.get('experience') as FormArray;
    return experiences.at(index) as FormGroup;
  }

  addNewForms(): void {
    const formArray = this.form.get('experience') as FormArray;
    formArray.push(this.experienceFormGroup());
  }

  onSubmit(): void {
    if(this.experienceId){
      console.log(this.updatedFormValue)
    } else {
      console.log(this.newFormValue)
    }
  }

  removeForms(i: number): void {
    const formArray = this.form.get('experience') as FormArray;
    formArray.removeAt(i);
  }

  private errorMessage(error: HttpErrorResponse): void {
    this.toastService.showError('Error!', error.message);
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}

