import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	standalone: true,
	imports: [AngularSvgIconModule, RouterOutlet],
})
export class AuthComponent {}
