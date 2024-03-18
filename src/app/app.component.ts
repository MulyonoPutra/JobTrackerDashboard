import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { take, timer } from 'rxjs';

import { AlertComponent } from './shared/components/alert/alert.component';
import { AuthInterceptorProvider } from './core/providers/auth-interceptor.provider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestInterceptorProvider } from './core/providers/http-request-interceptor.provider';
import { LoadingIndicatorComponent } from './shared/components/loading-indicator/loading-indicator.component';
import { NgClass } from '@angular/common';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
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
    AlertComponent,
    LoadingIndicatorComponent,
  ],
  providers: [AuthInterceptorProvider, HttpRequestInterceptorProvider],
})
export class AppComponent implements OnInit {
  title = 'Job Tracker';
  loadingIndicator!: boolean;
  constructor(public themeService: ThemeService, private router: Router) {
    this.showSpinner();
  }

  ngOnInit() { }

  showSpinner(): void {
    this.router.events.subscribe((routeEvent: Event) => {
      if (routeEvent instanceof NavigationStart) {
        this.loadingIndicator = true;
      }

      if (routeEvent instanceof NavigationEnd) {
        this.delay();
      }

      if (
        routeEvent instanceof NavigationEnd ||
        routeEvent instanceof NavigationError ||
        routeEvent instanceof NavigationCancel
      ) {
        this.delay();
      }
    });
  }

  delay(): void {
    timer(1000)
      .pipe(take(1))
      .subscribe(() => {
        this.loadingIndicator = false;
      });
  }
}
