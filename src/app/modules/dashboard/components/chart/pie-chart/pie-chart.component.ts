import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { Component, ViewChild, effect } from '@angular/core';

import { CardWrapperComponent } from 'src/app/shared/components/card-wrapper/card-wrapper.component';
import { ChartOptions } from '../chart.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    CommonModule, CardWrapperComponent, NgApexchartsModule,
  ],
  templateUrl: './pie-chart.component.html',
  styleUrls: [ './pie-chart.component.scss' ],
})
export class PieChartComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private readonly themeService: ThemeService) {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        height: 350,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
    };

    effect(() => {
      this.chartOptions.tooltip = {
        theme: this.themeService.themeChanged(),
      };
    });
  }
}
