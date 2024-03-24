import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Panel, PanelModule } from 'primeng/panel';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
	selector: 'app-fieldset-wrapper',
	standalone: true,
	imports: [
		CommonModule,
		FieldsetModule,
		AngularSvgIconModule,
		AvatarModule,
		PanelModule,
		MenuModule,
	],
	templateUrl: './fieldset-wrapper.component.html',
	styleUrls: ['./fieldset-wrapper.component.scss'],
})
export class FieldsetWrapperComponent implements OnInit {
	@Input() title!: string;
	@Output() createEvent = new EventEmitter<void>();
	@Output() updateEvent = new EventEmitter<void>();
	@Output() deleteEvent = new EventEmitter<void>();

	items!: MenuItem[];
	toggle = true;

	ngOnInit() {
		this.items = [
			{
				label: 'Options',
				items: [
					{
						label: 'Create',
						icon: 'pi pi-refresh',
						command: () => {
							this.create();
						},
					},
					{
						label: 'Update',
						icon: 'pi pi-refresh',
						command: () => {
							this.update();
						},
					},
					{
						label: 'Delete',
						icon: 'pi pi-times',
						command: () => {
							this.delete();
						},
					},
				],
			},
		];
	}

	create() {
		this.createEvent.emit();
	}

	update() {
		this.updateEvent.emit();
	}

	delete() {
		this.deleteEvent.emit();
	}
}
