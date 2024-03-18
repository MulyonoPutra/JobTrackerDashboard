import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AboutFormsComponent } from '../../components/about-forms/about-forms.component';
import { AccordionComponent } from 'src/app/shared/components/accordion/accordion.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CardWrapperComponent } from 'src/app/shared/components/card-wrapper/card-wrapper.component';
import { DatepickerComponent } from 'src/app/shared/components/datepicker/datepicker.component';
import { ExperienceFormsComponent } from '../../components/experience-forms/experience-forms.component';
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
  selector: 'app-profile-forms',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule,
    TitleWithIconComponent,
    AboutFormsComponent,
    ExperienceFormsComponent
  ],
  templateUrl: './profile-forms.component.html',
  styleUrls: ['./profile-forms.component.scss'],
  providers: [UserService],
})
export class ProfileFormsComponent {

}
