import { RouterModule, Routes } from '@angular/router';

import { ActivityCollectionsComponent } from './pages/activity-collections/activity-collections.component';
import { ActivityComponent } from './activity.component';
import { ActivityFormsComponent } from './pages/activity-forms/activity-forms.component';
import { FormGuard } from 'src/app/core/guards/form.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		component: ActivityComponent,
		children: [
			{ path: '', redirectTo: 'forms', pathMatch: 'full' },
			{ path: 'forms', component: ActivityFormsComponent, canDeactivate: [FormGuard] },
			{ path: 'update/:id', component: ActivityFormsComponent },
			{ path: 'collections', component: ActivityCollectionsComponent },
			{ path: '**', redirectTo: 'error/404' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ActivityRoutingModule {}
