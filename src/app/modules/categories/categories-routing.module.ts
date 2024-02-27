import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories.component';
import { CategoryCollectionsComponent } from './pages/category-collections/category-collections.component';
import { CategoryFormsComponent } from './pages/category-forms/category-forms.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		component: CategoriesComponent,
		children: [
			{ path: '', redirectTo: 'forms', pathMatch: 'full' },
			{ path: 'forms', component: CategoryFormsComponent },
			{ path: 'update/:id', component: CategoryFormsComponent },
			{ path: 'collections', component: CategoryCollectionsComponent },
			{ path: '**', redirectTo: 'error/404' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CategoriesRoutingModule {}
