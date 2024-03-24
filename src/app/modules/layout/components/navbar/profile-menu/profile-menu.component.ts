import { Component, Input } from '@angular/core';

import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { randomAvatar } from 'src/app/core/utils/random-avatar';

@Component({
	selector: 'app-profile-menu',
	templateUrl: './profile-menu.component.html',
	styleUrls: ['./profile-menu.component.scss'],
	standalone: true,
	imports: [ClickOutsideDirective, NgClass, RouterLink],
})
export class ProfileMenuComponent {
	@Input() user!: User;

	public isMenuOpen = false;
	randomAvatar!: string;

	constructor() {
		this.randomAvatar = randomAvatar();
	}

	public toggleMenu(): void {
		this.isMenuOpen = !this.isMenuOpen;
	}
}
