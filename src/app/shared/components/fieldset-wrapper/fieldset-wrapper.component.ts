import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Panel, PanelModule } from 'primeng/panel';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';

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
		TooltipModule,
	],
	templateUrl: './fieldset-wrapper.component.html',
	styleUrls: ['./fieldset-wrapper.component.scss'],
})
export class FieldsetWrapperComponent implements OnInit, AfterViewInit {
	@Input() title!: string;
	@Output() createEvent = new EventEmitter<void>();
	@Output() updateEvent = new EventEmitter<void>();
	@Output() deleteEvent = new EventEmitter<void>();

	items!: MenuItem[];
	toggle = true;

	@ViewChild('toggleablePanel') toggleablePanel!: Panel;

	ngAfterViewInit(): void {
		this.toggleablePanel.collapseIcon = 'pi pi-angle-double-down';
		this.toggleablePanel.expandIcon = 'pi pi-angle-double-up';
	}

	getTooltipContent(type: string): string {
		switch (type) {
			case 'Update':
				return 'Edit tooltip content';
			case 'Delete':
				return 'Delete tooltip content';
			case 'Create':
				return 'Add tooltip content';
			default:
				return '';
		}
	}

	ngOnInit() {
		this.actionItems();
	}

	private actionItems() {
		this.items = [
			{
				label: 'Create',
				items: [
					{
						label: 'Create',
						icon: 'pi pi-plus',
					},
					{
						label: 'Update',
						icon: 'pi pi-user-edit',
					},
					{
						label: 'Delete',
						icon: 'pi pi-trash',
					},
				],
			},
		];
	}

	executeCommand(action: string) {
		switch (action) {
			case 'Create':
				this.createEvent.emit();
				break;
			case 'Update':
				this.updateEvent.emit();
				break;
			case 'Delete':
				this.deleteEvent.emit();
				break;
			default:
				break;
		}
	}
}
