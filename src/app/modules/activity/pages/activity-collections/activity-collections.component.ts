import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil, timer } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Activities } from 'src/app/core/models/activity';
import { ActivityService } from 'src/app/core/services/activity.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CardWrapperComponent } from 'src/app/shared/components/card-wrapper/card-wrapper.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DropdownMenu } from 'src/app/core/models/dropdown-menu';
import { EmptyRecordMessageComponent } from 'src/app/shared/components/empty-record-message/empty-record-message.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Pagination } from 'src/app/core/models/pagination';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { Router } from '@angular/router';
import { SearchFormComponent } from 'src/app/shared/components/search-form/search-form.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
	selector: 'app-activity-collections',
	standalone: true,
	imports: [
		CommonModule,
		NgxPaginationModule,
		TranslateModule,
		TableComponent,
		SearchFormComponent,
		ConfirmDialogComponent,
		PaginationComponent,
		EmptyRecordMessageComponent,
		ButtonComponent,
		CardWrapperComponent,
	],
	templateUrl: './activity-collections.component.html',
	styleUrls: ['./activity-collections.component.scss'],
	providers: [ActivityService],
})
export class ActivityCollectionsComponent implements OnInit, OnDestroy {
	columns = [
		'companyName',
		'platform',
		'position',
		'location',
		'status',
		'jobPosted',
		'category',
		'appliedOn',
	];

	titles!: string;
	activityId!: string;

	activities!: Activities;

	showConfirmDialog = false;

	pagination!: Pagination;

	page = 1;
	perPage = 5;

	private destroyed = new Subject();

	newFormsRoute = 'activities/forms';

	constructor(
		private readonly router: Router,
		private readonly _activityService: ActivityService,
		private readonly _toastService: ToastService,
		private readonly translate: TranslateService
	) {}

	ngOnInit(): void {
		this.findAll();
	}

	findAll(): void {
		this._activityService
			.findAll(this.page, this.perPage)
			.pipe(takeUntil(this.destroyed))
			.subscribe({
				next: (response: any) => {
					this.activities = response.data.items;
					this.pagination = response.data.pagination;
				},
				error: (error: HttpErrorResponse) => {
					this.errorMessage(error);
				},
				complete: () => {},
			});
	}

	onSearch(query: string): void {
		console.log(query);
	}

	onPageChanged(event: number): void {
		this.page = event;
		this.findAll();
	}

	onClearInput(query: string): void {
		console.log(query);
	}

	onDropdownItemClick(menu: DropdownMenu): void {
		this.activityId = menu.id;
		if (menu.item === 'edit') {
			this.router.navigateByUrl(`/activities/update/${menu.id}`);
		} else {
			this.showConfirmationDialog();
		}
	}

	showConfirmationDialog(): void {
		this.showConfirmDialog = true;
	}

	onConfirmation(confirmed: boolean): void {
		this.showConfirmDialog = false;
		if (confirmed) {
			this.onRemove(this.activityId);
		}
	}

	createNew(): void {
		this.router.navigate(['/activities/forms']);
	}

	onRemove(item: string) {
		this._activityService
			.remove(item)
			.pipe(takeUntil(this.destroyed))
			.subscribe({
				next: () => {},
				error: (error: HttpErrorResponse) => {
					this.errorMessage(error);
				},
				complete: () => {
					this._toastService.showSuccess('Removed!', 'Successfully removed');
					this.navigateAfterSucceed();
				},
			});
	}

	navigateAfterSucceed(): void {
		timer(1000)
			.pipe(take(1))
			.subscribe(() =>
				this.router
					.navigateByUrl('/activities/collections')
					.then(() => window.location.reload())
			);
	}

	private errorMessage(error: HttpErrorResponse) {
		this._toastService.showError('Error!', error.message);
	}

	ngOnDestroy() {
		this.destroyed.next(true);
		this.destroyed.complete();
	}
}
