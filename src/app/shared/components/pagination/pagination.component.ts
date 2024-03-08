import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Pagination } from 'src/app/core/models/pagination';

@Component({
	selector: 'app-pagination',
	standalone: true,
	imports: [CommonModule, NgxPaginationModule, FormsModule],
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
	@Input() pagination!: Pagination;
	@Output() pageChange: EventEmitter<any> = new EventEmitter<any>();

	pageChanged(event: number): void {
		this.pageChange.emit(event);
	}
}
