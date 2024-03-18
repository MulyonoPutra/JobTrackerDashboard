import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-datepicker',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DatepickerComponent),
			multi: true,
		},
	],
})
export class DatepickerComponent implements OnInit {
	@Input() label!: string;
	@Output() dateSelected: EventEmitter<string> = new EventEmitter<string>();

	MONTH_NAMES = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	showDatepicker = false;
	datepickerValue!: string;
	month!: number;
	year!: number;
	numberOfDays = [] as number[];
	blankdays = [] as number[];
	value: string | undefined;

	constructor() {}

	ngOnInit(): void {
		this.initDate();
		this.getNoOfDays();
	}

	initDate() {
		let today = new Date();
		this.month = today.getMonth();
		this.year = today.getFullYear();
		this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();
	}

	isToday(date: any) {
		const today = new Date();
		const d = new Date(this.year, this.month, date);
		return today.toDateString() === d.toDateString() ? true : false;
	}

	getDateValue(date: any) {
		let selectedDate = new Date(this.year, this.month, date);
		selectedDate.setHours(12, 0, 0, 0);
		this.datepickerValue = selectedDate.toDateString();
		this.value = selectedDate.toISOString().split('T')[0]; // Set value for form control
		this.onChange(this.value); // Notify form control value change
		this.showDatepicker = false;
	}

	getNoOfDays() {
		const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

		let dayOfWeek = new Date(this.year, this.month).getDay();
		let blankdaysArray = [];
		for (var i = 1; i <= dayOfWeek; i++) {
			blankdaysArray.push(i);
		}

		let daysArray = [];
		for (var i = 1; i <= daysInMonth; i++) {
			daysArray.push(i);
		}

		this.blankdays = blankdaysArray;
		this.numberOfDays = daysArray;
	}

	trackByIdentity = (index: number, item: any) => item;

	// Value and change handlers for ControlValueAccessor
	private onChange: any = () => {};
	private onTouched: any = () => {};

	// Implement ControlValueAccessor methods
	writeValue(value: any): void {
		if (value) {
			const date = new Date(value);
			this.month = date.getMonth();
			this.year = date.getFullYear();
			this.datepickerValue = date.toDateString();
			this.getNoOfDays();
		}
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		// You can implement this if you want to handle disabling the control
	}
}

// https://stackblitz.com/edit/angular-ni2jcj?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fdate-time-range-picker%2Fdate-time-picker%2Fdate-time-range-picker.component.ts
