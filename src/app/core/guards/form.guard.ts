import { ActivityFormsComponent } from 'src/app/modules/activity/pages/activity-forms/activity-forms.component';
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class FormGuard implements CanDeactivate<ActivityFormsComponent> {
	canDeactivate(component: ActivityFormsComponent): boolean {
		if (component.form.dirty) {
			return confirm('Are you sure you want to navigate away and lose changes to the form?');
		}

		return true;
	}
}
