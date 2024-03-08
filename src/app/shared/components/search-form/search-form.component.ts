import { Component, EventEmitter, Output } from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchDirective } from '../../directives/search.directive';

@Component({
	selector: 'app-search-form',
	standalone: true,
	imports: [CommonModule, ButtonComponent, FormsModule, SearchDirective],
	templateUrl: './search-form.component.html',
	styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
	@Output() search = new EventEmitter<any>();
	@Output() clear = new EventEmitter<any>();

	query: string = '';

	onSearch(event: string): void {
		this.query = event;
		this.search.emit(event);
	}

	onClear(event: any): void {
		this.query = event;
		this.clear.emit(event);
	}
}
