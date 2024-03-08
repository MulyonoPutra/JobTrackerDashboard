import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LANGUAGE_OPTIONS } from 'src/app/core/mocks/language-options.mock';
import { LanguageOptions } from 'src/app/core/models/language-options';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-i18n-menu',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './i18n-menu.component.html',
	styleUrls: ['./i18n-menu.component.scss'],
	providers: [TranslateService],
})
export class I18nMenuComponent implements OnInit {
	constructor(public translate: TranslateService) {}

	languageOptions: LanguageOptions[] = LANGUAGE_OPTIONS;
	language!: LanguageOptions;

	private showMenuClass = [
		'scale-100',
		'animate-fade-in-up',
		'opacity-100',
		'pointer-events-auto',
	];
	private hideMenuClass = [
		'scale-95',
		'animate-fade-out-down',
		'opacity-0',
		'pointer-events-none',
	];

	isDropdownOpen = false;

	ngOnInit(): void {
		this.setDefaultLanguage();
	}

	changeLanguage(lang: string): void {
		this.translate.use(lang);
	}

	setDefaultLanguage(): void {
		this.translate.addLangs(['en', 'in']);
		this.translate.setDefaultLang('en');
		const browserLang = this.translate.getBrowserLang();
		if (browserLang) {
			this.translate.use(browserLang.match(/en|in/) ? browserLang : 'en');
			if (this.languageOptions.length > 0) {
				this.languageOptions.map((lang) => {
					this.language = {
						code: lang.code,
						name: lang.name,
						flagUrl: lang.flagUrl,
					};
				});
			}
		}
	}

	afterLanguageChange(language: LanguageOptions): void {
		this.language = language;

		this.translate.use(this.language.code);
		this.isDropdownOpen = false;
	}

	public mouseEnter(): void {
		this.isDropdownOpen = !this.isDropdownOpen;
	}

	public mouseLeave(): void {
		this.isDropdownOpen = false;
	}
}
