import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertComponent } from './shared/components/alert/alert.component';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
  imports: [NgClass, RouterOutlet, ResponsiveHelperComponent, HttpClientModule, FormsModule, ReactiveFormsModule, AlertComponent],
})
export class AppComponent {
	title = 'Angular Tailwind';

	constructor(public themeService: ThemeService) {
    
  }
}
