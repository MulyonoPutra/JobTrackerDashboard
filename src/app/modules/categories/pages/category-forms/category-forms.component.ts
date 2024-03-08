import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { take, timer } from 'rxjs';

import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { Category } from 'src/app/core/models/category';
import { CategoryDTO } from 'src/app/core/dto/create-category.dto';
import { CategoryService } from 'src/app/core/services/category.service';
import { FormFieldComponent } from 'src/app/shared/components/form-field/form-field.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-category-forms',
  standalone: true,
  imports: [CommonModule, FormFieldComponent, FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './category-forms.component.html',
  styleUrls: ['./category-forms.component.scss'],
  providers: [CategoryService],
})
export class CategoryFormsComponent implements OnInit {
  form!: FormGroup;
  routeId!: string;
  label!: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly validations: ValidationService,
    private readonly categoryService: CategoryService,
    private readonly location: Location,
    private readonly _toastService: ToastService,
  ) {
    this.routeId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.formInitialized();
    this.initPageFromRouteId();
  }

  initPageFromRouteId(): void {
    this.label = this.routeId ? 'Update' : 'Create';
    if (this.routeId) {
      this.findOne();
    }
  }

  get submitButtonLabel(): string {
    return this.label;
  }

  get cancelButtonLabel(): string {
    return 'Cancel';
  }

  formInitialized(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  get formCtrlValue(): CategoryDTO {
    return {
      name: this.form.get('name')?.value,
    };
  }

  prepopulateForm(category: CategoryDTO): void {
    this.form.patchValue({
      name: category.name,
    });
  }

  findOne(): void {
    this.categoryService.findOne(this.routeId).subscribe({
      next: (category: Category) => {
        this.prepopulateForm(category);
      },
      error: (error: HttpErrorResponse) => {
        this._toastService.showError('Error!', error.message)
      },
      complete: () => { },
    });
  }

  getFormControl(form: string): FormControl | AbstractControl {
    return this.form.get(form) as FormControl;
  }

  onCreate(): void {
    this.categoryService.create(this.formCtrlValue).subscribe({
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
    this.categoryService.update(this.routeId, this.formCtrlValue).subscribe({
      next: () => {
        this._toastService.showSuccess('Success!', 'Successfully updated!');
      },
      error: (error: HttpErrorResponse) => {
        this._toastService.showError('Error!', error.message)
      },
      complete: () => this.navigateAfterSucceed(),
    });
  }

  navigateAfterSucceed(): void {
    timer(1000)
      .pipe(take(1))
      .subscribe(() => this.router.navigateByUrl('/categories/collections'));
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.routeId ? this.onUpdate() : this.onCreate();
    } else {
      this.validations.markAllFormControlsAsTouched(this.form);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
