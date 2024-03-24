import {
	ApexChart,
	ApexNonAxisChartSeries,
	ApexResponsive,
	ApexTitleSubtitle,
	ApexTooltip,
	ApexXAxis,
	ChartComponent,
	NgApexchartsModule,
} from 'ng-apexcharts';
import { Component, ViewChild, effect } from '@angular/core';

import { CardWrapperComponent } from 'src/app/shared/components/card-wrapper/card-wrapper.component';
import { ColumnChartComponent } from './column-chart/column-chart.component';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ThemeService } from 'src/app/core/services/theme.service';

export type ChartOptions = {
	series: ApexNonAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	title: ApexTitleSubtitle;
	responsive: ApexResponsive[];
	labels: any;
	tooltip: ApexTooltip;
};

@Component({
	selector: 'app-chart',
	standalone: true,
	imports: [CommonModule, CardWrapperComponent, PieChartComponent, ColumnChartComponent],
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
})
export class ChartsComponent {}
