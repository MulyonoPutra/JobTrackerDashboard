import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet
  ],
  templateUrl: './activity.component.html',
  styleUrls: [ './activity.component.scss' ],
})
export class ActivityComponent implements OnInit {

  ngOnInit(): void { }

}
