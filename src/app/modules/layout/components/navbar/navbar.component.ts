import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpErrorResponse } from '@angular/common/http';
import { I18nMenuComponent } from './i18n-menu/i18n-menu.component';
import { MenuService } from '../../services/menu.service';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobilecomponent';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { ToastService } from 'src/app/core/services/toast.service';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	standalone: true,
	imports: [
		AngularSvgIconModule,
		NavbarMenuComponent,
		ProfileMenuComponent,
		NavbarMobileComponent,
    I18nMenuComponent
	],
  providers: [UserService]
})
export class NavbarComponent implements OnInit, OnDestroy {

	constructor(
    private readonly menuService: MenuService,
    private readonly userService: UserService,
    private readonly toastService: ToastService,
    ) {}

  private destroyed = new Subject();

  user!: User;

	ngOnInit(): void {
    this.userDetail();
  }

	public toggleMobileMenu(): void {
		this.menuService.showMobileMenu = true;
	}

  userDetail(): void {
    this.userService.findUser().pipe(takeUntil(this.destroyed)).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage(error);
      },
      complete: () => {},
    });
  }

  private errorMessage(error: HttpErrorResponse) {
    this.toastService.showError('Error!', error.message);
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
