import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-read-more',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './read-more.component.html',
	styleUrls: ['./read-more.component.scss'],
})
export class ReadMoreComponent implements AfterViewInit {
	@Input() text!: string;

	//maximum height of the container
	@Input() maxHeight: number = 10;

	//set these to false to get the height of the expended container
	public isCollapsed: boolean = false;
	public isCollapsable: boolean = false;

	constructor(private elementRef: ElementRef) {}

	ngAfterViewInit() {
		let currentHeight =
			this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
		//collapsable only if the contents make container exceed the max height
		if (currentHeight > this.maxHeight) {
			this.isCollapsed = true;
			this.isCollapsable = true;
		}
	}
}
