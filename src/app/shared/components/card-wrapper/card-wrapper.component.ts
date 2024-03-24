import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-card-wrapper',
	standalone: true,
	imports: [CommonModule, TranslateModule],
	templateUrl: './card-wrapper.component.html',
	styleUrls: ['./card-wrapper.component.scss'],
})
export class CardWrapperComponent {
	@Input() title!: string;
	@Input() customMessage!: string;
}
