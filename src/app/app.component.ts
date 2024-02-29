import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AlertComponent } from './shared/components/alert/alert.component';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    NgClass,
    RouterOutlet,
    ResponsiveHelperComponent,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class AppComponent {
  title = 'Angular Tailwind';

  constructor(public themeService: ThemeService) {

  }
}
