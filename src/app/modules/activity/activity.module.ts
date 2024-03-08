import { ActivityRoutingModule } from './activity-routing.module';
import { CommonModule } from '@angular/common';
import { FormGuard } from 'src/app/core/guards/form.guard';
import { NgModule } from '@angular/core';

@NgModule({
	declarations: [],
	imports: [CommonModule, ActivityRoutingModule],
	providers: [FormGuard],
})
export class ActivityModule {}
