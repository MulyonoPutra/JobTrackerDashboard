import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Subject, take, takeUntil, timer } from 'rxjs';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CalendarComponent } from 'src/app/shared/components/calendar/calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { CreateExperienceDto } from 'src/app/core/dto/create-experience.dto';
import { EditorModule } from 'primeng/editor';
import { Experience } from 'src/app/core/models/experience';
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
		CalendarModule,
		CalendarComponent,
		EditorModule,
	],
	templateUrl: './experience-forms.component.html',
	styleUrls: ['./experience-forms.component.scss'],
	providers: [UserService],
})
export class ExperienceFormsComponent implements OnInit, OnDestroy {
	form!: FormGroup;
	routeId!: string;
	randomAvatar!: string;
	isDisabled = false;

	private destroyed = new Subject();

	@Input() isUpdate = false;
	@Input() experienceId!: string;

	responsibilitiesValue = 'Add your responsibility here..';

	constructor(
		private readonly fb: FormBuilder,
		private readonly location: Location,
		private readonly toastService: ToastService,
		private readonly userService: UserService
	) {}

	ngOnInit(): void {
		if (this.isUpdate) {
			this.formInitialized();
		} else {
			this.findOne(!this.isUpdate);
		}
	}

	formInitialized(): void {
		this.form = this.fb.group({
			experience: this.fb.array([this.experienceFormGroup()]),
		});
	}

	findOne(populateForm: boolean): void {
		this.userService.findUser().subscribe({
			next: (user: User) => {
				this.form = this.fb.group({
					experience: this.fb.array(
						populateForm
							? user.experience.map((x: Experience) => this.prepopulateForms(x))
							: user.experience.map(() => {
									return this.experienceFormGroup();
							  })
					),
				});

				if (!populateForm) {
					this.form.reset();
				}
			},
			error: (error: HttpErrorResponse) => {
				this.errorMessage(error);
			},
			complete: () => {},
		});
	}

	private prepopulateForms(data: CreateExperienceDto) {
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

	get experienceFormArray(): FormArray {
		return this.form.get('experience')! as FormArray;
	}

	get experienceFormArrayValue(): CreateExperienceDto[] {
		return this.form.value.experience;
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

	removeForms(i: number): void {
		const formArray = this.form.get('experience') as FormArray;
		formArray.removeAt(i);
	}

	submitFormToServer(): void {
		this.userService
			.newExperience(this.experienceFormArrayValue)
			.pipe(takeUntil(this.destroyed))
			.subscribe({
				next: (response) => {
					this.successMessage(response);
				},
				error: (error: HttpErrorResponse) => {
					this.errorMessage(error);
				},
				complete: () => {
					this.onReload();
				},
			});
	}

	onSubmit(): void {
		if (this.form.valid) {
			if (this.experienceId) {
				this.updateFormToServer();
			} else {
				this.submitFormToServer();
			}
		}
	}

	updateFormToServer(): void {
		this.userService
			.updateExperience(this.experienceId, this.experienceFormGroupValue)
			.pipe(takeUntil(this.destroyed))
			.subscribe({
				next: (response) => {
					this.successMessage(response);
				},
				error: (error: HttpErrorResponse) => {
					this.errorMessage(error);
				},
				complete: () => {
					this.onReload();
				},
			});
	}

	onReload(): void {
		timer(1000)
			.pipe(take(1))
			.subscribe(() => window.location.reload());
	}

	private errorMessage(error: HttpErrorResponse) {
		this.toastService.showError('Error!', error.message);
	}

	private successMessage(message: string) {
		this.toastService.showSuccess('Success!', message);
	}

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
