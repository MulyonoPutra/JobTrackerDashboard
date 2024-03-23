import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AboutFormsComponent } from '../../components/about-forms/about-forms.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CardWrapperComponent } from 'src/app/shared/components/card-wrapper/card-wrapper.component';
import { CommonModule } from '@angular/common';
import { Education } from 'src/app/core/models/education';
import { Experience } from 'src/app/core/models/experience';
import { ExperienceFormsComponent } from '../../components/experience-forms/experience-forms.component';
import { FieldsetWrapperComponent } from 'src/app/shared/components/fieldset-wrapper/fieldset-wrapper.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ReadMoreComponent } from 'src/app/shared/components/read-more/read-more.component';
import { Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { SummaryDisplayComponent } from '../../components/summary-display/summary-display.component';
import { TitleGradientComponent } from 'src/app/shared/components/title-gradient/title-gradient.component';
import { ToastService } from 'src/app/core/services/toast.service';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { randomAvatar } from 'src/app/core/utils/random-avatar';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    ReadMoreComponent,
    CardWrapperComponent,
    ButtonComponent,
    SidebarModule,
    FieldsetWrapperComponent,
    SummaryDisplayComponent,
    AboutFormsComponent,
    TitleGradientComponent,
    ExperienceFormsComponent
  ],
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
  providers: [UserService],
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  private destroyed = new Subject();
  educationIcon = 'assets/icons/graduation.svg';
  experienceIcon = 'assets/icons/list.svg';

  sidebarVisible = false;
  isEducation = false;
  isExperience = false;
  isProfile = false;

  user!: User;
  education!: Education[];
  experience!: Experience[];
  randomAvatar!: string;

  constructor(
    private readonly userService: UserService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {
    this.randomAvatar = randomAvatar();
  }

  ngOnInit(): void {
    this.findOne();
  }

  findOne(): void {
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

  /**
   * Navigate to profile forms page with passing user data
   */
  onNavigate() {
    this.router.navigateByUrl(`/profile/update/${this.user.id}`, { state: this.user });
  }

  private errorMessage(error: HttpErrorResponse) {
    this.toastService.showError('Error!', error.message);
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  onUpdate(): void {
    this.sidebarVisible = !this.sidebarVisible;
    this.isProfile = !this.isProfile;
  }

  onCreate(): void {

  }

  onUpdateEducation(): void {
    this.sidebarVisible = !this.sidebarVisible;
    this.isEducation = !this.isEducation;
  }

  onUpdateExperience(): void {
    this.sidebarVisible = !this.sidebarVisible;
    this.isExperience = !this.isExperience;
  }

  onRemove(): void {
    alert('Remove');
  }

}
