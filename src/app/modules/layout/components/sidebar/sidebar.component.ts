import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthService } from 'src/app/core/services/auth.service';
import { MenuService } from '../../services/menu.service';
import { RouterLink } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { ThemeService } from 'src/app/core/services/theme.service';
import packageJson from '../../../../../../package.json';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	standalone: true,
	imports: [NgClass, NgIf, AngularSvgIconModule, SidebarMenuComponent, RouterLink],
})
export class SidebarComponent implements OnInit {
	public appJson: any = packageJson;

	constructor(
		public readonly themeService: ThemeService,
		public readonly menuService: MenuService,
		public readonly authService: AuthService
	) {}

	ngOnInit(): void {}

	public toggleSidebar() {
		this.menuService.toggleSidebar();
	}

	toggleTheme() {
		this.themeService.theme = !this.themeService.isDark ? 'dark' : 'light';
	}

	logout(): void {
		this.authService.logout();
	}
}
