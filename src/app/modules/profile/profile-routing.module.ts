import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { ProfileFormsComponent } from './pages/profile-forms/profile-forms.component';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
		children: [
			{ path: '', redirectTo: 'forms', pathMatch: 'full' },
			{ path: 'update/:id', component: ProfileFormsComponent },
			{ path: '', component: ProfileDetailComponent },
			{ path: '**', redirectTo: 'error/404' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProfileRoutingModule {}
