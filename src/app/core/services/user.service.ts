import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { handlerHttpError } from '../utils/error-handler';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	env = 'http://localhost:3000';

	constructor(private readonly http: HttpClient) {}

	findUser(): Observable<User> {
		return this.http.get<HttpResponseEntity<User>>(`${this.env}/user/detail`).pipe(
			map((response) => response.data),
			catchError((error: HttpErrorResponse) => handlerHttpError(error))
		);
	}
}
