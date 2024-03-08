import { Component, Input, OnInit } from '@angular/core';

import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from 'src/app/core/models/user';

@Component({
	selector: 'app-profile-menu',
	templateUrl: './profile-menu.component.html',
	styleUrls: ['./profile-menu.component.scss'],
	standalone: true,
	imports: [ClickOutsideDirective, NgClass, RouterLink],
})
export class ProfileMenuComponent implements OnInit {
	emptyAvatar =
		'https://static.vecteezy.com/system/resources/previews/036/594/092/original/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg';

	@Input() user!: User;

	public isMenuOpen = false;

	constructor() {}

	ngOnInit(): void {}

	public toggleMenu(): void {
		this.isMenuOpen = !this.isMenuOpen;
	}
}
