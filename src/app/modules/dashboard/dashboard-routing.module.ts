import { RouterModule, Routes } from '@angular/router';

import { ChartsComponent } from './components/chart/chart.component';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { NgModule } from '@angular/core';
import { PodcastComponent } from './pages/podcast/podcast.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{ path: '', redirectTo: 'nfts', pathMatch: 'full' },
			{ path: 'nfts', component: NftComponent },
			{ path: 'podcast', component: PodcastComponent },
			{ path: 'chart', component: ChartsComponent },
			{ path: '**', redirectTo: 'error/404' },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
