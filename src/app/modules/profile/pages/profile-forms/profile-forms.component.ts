import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AboutFormsComponent } from '../../components/about-forms/about-forms.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExperienceFormsComponent } from '../../components/experience-forms/experience-forms.component';
import { TitleWithIconComponent } from 'src/app/shared/components/title-with-icon/title-with-icon.component';
import { UserService } from 'src/app/core/services/user.service';

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
		ExperienceFormsComponent,
	],
	templateUrl: './profile-forms.component.html',
	styleUrls: ['./profile-forms.component.scss'],
	providers: [UserService],
})
export class ProfileFormsComponent {}
