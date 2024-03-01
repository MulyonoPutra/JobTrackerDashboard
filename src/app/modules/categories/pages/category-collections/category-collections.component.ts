import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil, timer } from 'rxjs';

import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CardCollectionsComponent } from 'src/app/shared/components/card-collections/card-collections.component';
import { Categories } from 'src/app/core/models/category';
import { CategoryDTO } from 'src/app/core/dto/create-category.dto';
import { CategoryService } from 'src/app/core/services/category.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DropdownMenu } from 'src/app/core/models/dropdown-menu';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Pagination } from 'src/app/core/models/pagination';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { Router } from '@angular/router';
import { SearchFormComponent } from 'src/app/shared/components/search-form/search-form.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-category-collections',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent,
    SearchFormComponent,
    ConfirmDialogComponent,
    PaginationComponent,
    NgxPaginationModule,
    CardCollectionsComponent,
    ButtonComponent
  ],
  templateUrl: './category-collections.component.html',
  styleUrls: ['./category-collections.component.scss'],
  providers: [CategoryService],
})
export class CategoryCollectionsComponent implements OnInit, OnDestroy {
  private destroyed = new Subject();

  columns = ['id', 'name'];
  categories!: Categories;
  categoryId!: string;
  pagination!: Pagination;
  showConfirmDialog = false;
  page = 1;
  perPage = 5;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly router: Router,
    private readonly _toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.searchFromServer();
  }

  onDropdownItemClick(menu: DropdownMenu): void {
    this.categoryId = menu.id;
    if (menu.item === 'edit') {
      this.router.navigateByUrl(`/categories/update/${menu.id}`);
    } else {
      this.showConfirmationDialog();
    }
  }

  onUpdate(item: string, body: CategoryDTO) {
    this.categoryService.update(item, body).pipe(takeUntil(this.destroyed)).subscribe({
      next: () => { },
      error: (error: HttpErrorResponse) => {
        this.errorMessage(error);
      },
      complete: () => { },
    });
  }

  searchFromServer(query?: string) {
    this.categoryService
      .searchWithPaging(query, this.page, this.perPage)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (response) => {
          this.categories = response.body.data.items;
          this.pagination = response.body.data.pagination;
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage(error);
        },
        complete: () => { },
      });
  }

  onPageChanged(event: number): void {
    this.page = event;
    this.searchFromServer();
  }

  onRemove(item: string) {
    this.categoryService.remove(item).pipe(takeUntil(this.destroyed)).subscribe({
      next: () => { },
      error: (error: HttpErrorResponse) => {
        this.errorMessage(error);
      },
      complete: () => {
        this._toastService.showSuccess('Removed!', 'Successfully removed');
        this.navigateAfterSucceed();
      },
    });
  }

  createNew(): void {
    this.router.navigate(['/categories/forms']);
  }

  navigateAfterSucceed(): void {
    timer(1000)
      .pipe(take(1))
      .subscribe(() =>
        this.router
          .navigateByUrl('/categories/collections')
          .then(() => window.location.reload())
      );
  }

  onSearch(query: string): void {
    console.log(query);
    this.searchFromServer(query);
  }

  onClearInput(query: string): void {
    this.searchFromServer(query);
  }

  showConfirmationDialog(): void {
    this.showConfirmDialog = true;
  }

  onConfirmation(confirmed: boolean): void {
    this.showConfirmDialog = false;
    if (confirmed) {
      this.onRemove(this.categoryId);
    }
  }

  private errorMessage(error: HttpErrorResponse) {
    this._toastService.showError('Error!', error.message);
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
