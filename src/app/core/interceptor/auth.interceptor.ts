import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private storageService: StorageService, private route: Router) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.storageService.getAccessToken();

		if (token) {
			const clonedRequest = request.clone({
				setHeaders: { Authorization: `Bearer ${token}` },
			});

			return next.handle(clonedRequest);
		}

		return next.handle(request).pipe(
			catchError((err) => {
				if (err.status >= 400) {
					this.route.navigate(['/auth/sign-in']);
				}
				const error = err.error.message || err.statusText;
				return throwError(() => error);
			})
		);
	}
}
