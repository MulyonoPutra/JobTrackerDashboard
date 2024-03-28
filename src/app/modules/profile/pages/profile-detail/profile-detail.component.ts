import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, take, takeUntil, timer } from 'rxjs';

import { AboutFormsComponent } from '../../components/about-forms/about-forms.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CardWrapperComponent } from 'src/app/shared/components/card-wrapper/card-wrapper.component';
import { CommonModule } from '@angular/common';
import { DialogState } from 'src/app/core/models/dialog-state';
import { Education } from 'src/app/core/models/education';
import { Experience } from 'src/app/core/models/experience';
import { FieldsetWrapperComponent } from 'src/app/shared/components/fieldset-wrapper/fieldset-wrapper.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileFormsComponent } from '../profile-forms/profile-forms.component';
import { ReadMoreComponent } from 'src/app/shared/components/read-more/read-more.component';
import { Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { SummaryDisplayComponent } from '../../components/summary-display/summary-display.component';
import { TitleGradientComponent } from 'src/app/shared/components/title-gradient/title-gradient.component';
import { ToastService } from 'src/app/core/services/toast.service';
import { TooltipModule } from 'primeng/tooltip';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { randomAvatar } from 'src/app/core/utils/random-avatar';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [
    CommonModule,
    TooltipModule,
    AngularSvgIconModule,
    ReadMoreComponent,
    CardWrapperComponent,
    ButtonComponent,
    SidebarModule,
    FieldsetWrapperComponent,
    SummaryDisplayComponent,
    AboutFormsComponent,
    TitleGradientComponent,
  ],
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
  providers: [UserService, DialogService, DynamicDialogConfig],
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  private destroyed = new Subject();
  educationIcon = 'assets/icons/graduation.svg';
  experienceIcon = 'assets/icons/list.svg';

  isEmpty = false;
  isVisible = false;

  user!: User;
  education!: Education[];
  experience!: Experience[];

  randomAvatar!: string;
  experienceId!: string;
  ref: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private readonly userService: UserService,
    private readonly toastService: ToastService,
    private readonly router: Router,
    public config: DynamicDialogConfig
  ) {
    this.randomAvatar = randomAvatar();
  }

  ngOnInit(): void {
    this.findUser();
  }

  findUser(): void {
    this.userService
      .findUser()
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (response) => {
          this.user = response;
          this.education = response.education;
          this.experience = response.experience;
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage(error);
        },
        complete: () => { },
      });
  }

  onUpdateEducation(): void { }

  onRemoveExperienceFromServer(id: string): void {
    this.userService
      .removeExperience(id)
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

  onRemoveEducationFromServer(id: string): void {
    this.userService
      .removeEducation(id)
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

  onClose(): void {
  }

  private errorMessage(error: HttpErrorResponse) {
    this.toastService.showError('Error!', error.message);
  }

  private successMessage(message: string) {
    this.toastService.showSuccess('Success!', message);
  }

  private onReload(): void {
    timer(1000)
      .pipe(take(1))
      .subscribe(() => window.location.reload());
  }

  onUpdate(id: string): void {
    this.isEmpty = false;
    const params: DialogState = {
      id: id,
      isEmpty: this.isEmpty,
      items: undefined,
      title: 'Update Experience Form'
    }
    this.openDynamicDialog(params);
  }

  onCreate(): void {
    this.isEmpty = true;
    const params: DialogState = {
      id: null,
      isEmpty: this.isEmpty,
      items: undefined,
      title: 'Create Experience Form'
    }
    this.openDynamicDialog(params);
  }

  openDynamicDialog(params: DialogState): void {
    this.ref = this.dialogService.open(ProfileFormsComponent, {
      data: {
        id: params.id,
        isEmpty: params.isEmpty,
      },
      header: params.title,
      width: '40%'
    });

    this.ref.onClose.subscribe((e) => {
      this.isEmpty = false;
    });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}

