import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	private token!: string | null;
	constructor(private cookieService: CookieService) {}

	public setAccessToken(token: string | null): void {
		this.token = token;
		this.cookieService.delete('credentials');
		this.cookieService.set('credentials', token!);
	}

	public getAccessToken(): string {
		return this.cookieService.get('credentials');
	}

	public clear(): void {
		this.token = null;
		this.cookieService.deleteAll('/');
	}
}
