import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-card-collections',
	standalone: true,
	imports: [CommonModule, TranslateModule],
	templateUrl: './card-collections.component.html',
	styleUrls: ['./card-collections.component.scss'],
})
export class CardCollectionsComponent {
	@Input() title!: string;
	@Input() customMessage!: string;
}
