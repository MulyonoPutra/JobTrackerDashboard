import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: 'dashboard',
		component: LayoutComponent,
		loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
	},
	{
		path: 'categories',
		component: LayoutComponent,
		loadChildren: () =>
			import('../categories/categories.module').then((m) => m.CategoriesModule),
	},
  {
    path: 'activities',
    component: LayoutComponent,
    loadChildren: () =>
      import('../activity/activity.module').then((m) => m.ActivityModule),
  },
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: '**', redirectTo: 'error/404' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LayoutRoutingModule {}
