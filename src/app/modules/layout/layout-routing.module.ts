import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuard } from 'src/app/core/guards/auth.guard';
import { LayoutComponent } from './layout.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: 'dashboard',
		component: LayoutComponent,
		loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
		canActivate: [AuthenticationGuard],
	},
	{
		path: 'categories',
		component: LayoutComponent,
		loadChildren: () =>
			import('../categories/categories.module').then((m) => m.CategoriesModule),
		canActivate: [AuthenticationGuard],
	},
	{
		path: 'activities',
		component: LayoutComponent,
		loadChildren: () => import('../activity/activity.module').then((m) => m.ActivityModule),
		canActivate: [AuthenticationGuard],
	},
	{
		path: 'profile',
		component: LayoutComponent,
		loadChildren: () => import('../profile/profile.module').then((m) => m.ProfileModule),
		canActivate: [AuthenticationGuard],
	},
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: '**', redirectTo: 'error/404' },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LayoutRoutingModule {}
