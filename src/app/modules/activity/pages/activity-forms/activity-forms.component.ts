import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, take, takeUntil, timer } from 'rxjs';

import { Activity } from 'src/app/core/models/activity';
import { ActivityService } from 'src/app/core/services/activity.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CardCollectionsComponent } from 'src/app/shared/components/card-collections/card-collections.component';
import { Categories } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { FormSelectComponent } from 'src/app/shared/components/form-select/form-select.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-activity-forms',
  standalone: true,
  imports: [
    CommonModule,
    FormFieldComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    FormSelectComponent,
    DatepickerComponent,
    CardCollectionsComponent
  ],
  templateUrl: './activity-forms.component.html',
  styleUrls: ['./activity-forms.component.scss'],
  providers: [ActivityService, CategoryService],
})
export class ActivityFormsComponent implements OnInit, AfterViewInit, OnDestroy {

  private destroyed = new Subject();

  form!: FormGroup;
  routeId!: string;
  label!: string;
  jobTypes!: any[];
  status!: any[];
  categories!: Categories;

  title = this.label + 'Activities';

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly validations: ValidationService,
    private readonly _activityService: ActivityService,
    private readonly _toastService: ToastService,
    private readonly _categoryService: CategoryService,
    private readonly location: Location,
  ) {
    this.routeId = this.route.snapshot.paramMap.get('id')!;
  }

  ngAfterViewInit(): void {
    this.findJobTypes();
    this.findAppliedStatus();
    this.findCategoriesFromServer();
  }

  ngOnInit(): void {
    this.formInitialized();
    this.initPageFromRouteId();
  }

  formInitialized(): void {
    this.form = this.fb.group({
      position: ['', Validators.required],
      companyName: ['', Validators.required],
      location: ['', Validators.required],
      jobType: ['', Validators.required],
      status: ['', Validators.required],
      appliedOn: ['', Validators.required],
      jobPosted: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  initPageFromRouteId(): void {
    if (this.routeId) {
      this.findOne();
      this.label = 'Update';
    } else {
      this.label = 'Create';
    }
  }

  get formCtrlValue() {
    return {
      position: this.form.get('position')?.value,
      companyName: this.form.get('companyName')?.value,
      location: this.form.get('location')?.value,
      jobType: this.form.get('jobType')?.value,
      status: this.form.get('status')?.value,
      appliedOn: this.form.get('appliedOn')?.value,
      jobPosted: this.form.get('jobPosted')?.value,
      categoryId: this.form.get('categoryId')?.value,
    };
  }

  prepopulateForm(activity: Activity): void {
    this.form.patchValue({
      id: activity.id,
      position: activity.position,
      companyName: activity.companyName,
      location: activity.location,
      jobType: activity.jobType,
      status: activity.status,
      appliedOn: activity.appliedOn,
      jobPosted: activity.jobPosted,
      categoryId: activity.category.id,
    });
  }

  findOne(): void {
    this._activityService.findOne(this.routeId).pipe(takeUntil(this.destroyed)).subscribe({
      next: (activity: Activity) => {
        this.prepopulateForm(activity);
      },
      error: (error: HttpErrorResponse) => {
        this._toastService.showError('Error!', error.message)
      },
      complete: () => { },
    });
  }

  onAppliedOnSelected(selectedDate: string) {
    this.form.patchValue({
      appliedOn: selectedDate
    });
  }

  onJobPostedSelected(selectedDate: string) {
    this.form.patchValue({
      jobPosted: selectedDate
    });
  }

  findJobTypes(): void {
    this._activityService.findJobTypes().subscribe({
      next: (response) => {
        this.jobTypes = response;
      }
    })
  }

  findAppliedStatus(): void {
    this._activityService.findAppliedStatus().pipe(takeUntil(this.destroyed)).subscribe({
      next: (response) => {
        this.status = response;
      }
    })
  }

  findCategoriesFromServer(): void {
    this._categoryService.findAll().pipe(takeUntil(this.destroyed)).subscribe({
      next: (response) => {
        this.categories = response;
      },
    })
  }

  onCreate(): void {
    this._activityService.create(this.formCtrlValue).pipe(takeUntil(this.destroyed)).subscribe({
      next: () => {
        this._toastService.showSuccess('Success!', 'Successfully created!');
      },
      error: (error: HttpErrorResponse) => {
        this._toastService.showError('Error!', error.message)
      },
      complete: () => this.navigateAfterSucceed(),
    });
  }

  onUpdate(): void {
    this._activityService.update(this.routeId, this.formCtrlValue).pipe(takeUntil(this.destroyed)).subscribe({
      next: () => {
        this._toastService.showSuccess('Success!', 'Successfully updated!');
      },
      error: (error: HttpErrorResponse) => {
        this._toastService.showError('Error!', error.message)
      },
      complete: () => this.navigateAfterSucceed(),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.routeId ? this.onUpdate() : this.onCreate();
    } else {
      this.validations.markAllFormControlsAsTouched(this.form);
    }
  }

  navigateAfterSucceed(): void {
    timer(1000)
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/activities/collections'));
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}
