import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Education } from 'src/app/core/models/education';
import { Experience } from 'src/app/core/models/experience';
import { TextOverflowPipe } from 'src/app/shared/pipes/text-overflow.pipe';
import { User } from 'src/app/core/models/user';

@Component({
	selector: 'app-summary-display',
	standalone: true,
	imports: [CommonModule, TextOverflowPipe],
	templateUrl: './summary-display.component.html',
	styleUrls: ['./summary-display.component.scss'],
})
export class SummaryDisplayComponent {
	@Input() isEducation = false;
	@Input() isExperience = false;
	@Input() isProfile = false;
	@Input() user!: User;
	@Input() education!: Education;
	@Input() experience!: Experience;
}
