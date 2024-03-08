import { Activities, Activity } from '../models/activity';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { CreateActivityDTO } from '../dto/create-activity.dto';
import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';
import { UpdateActivityDTO } from '../models/dto/update-activity.dto';
import { handlerHttpError } from '../utils/error-handler';

@Injectable({
	providedIn: 'root',
})
export class ActivityService {
	env = 'http://localhost:3000';
	constructor(private readonly http: HttpClient) {}

	findAll(page?: number, perPage?: number): Observable<any> {
		let endpoint = `${this.env}/activity`;

		const params: { [param: string]: string } = {};
		if (page) params['page'] = page.toString();
		if (perPage) params['perPage'] = perPage.toString();

		// Construct URL with query parameters
		if (Object.keys(params).length > 0) {
			const queryParams = new URLSearchParams(params).toString();
			endpoint += `?${queryParams}`;
		}

		return this.http.get<any>(endpoint).pipe(
			map((response) => response),
			catchError((error: HttpErrorResponse) => handlerHttpError(error))
		);
	}

	findOne(id: string): Observable<Activity> {
		return this.http.get<HttpResponseEntity<Activity>>(`${this.env}/activity/${id}`).pipe(
			map((response) => response.data),
			catchError((error: HttpErrorResponse) => handlerHttpError(error))
		);
	}

	findJobTypes(): Observable<any> {
		return this.http.get<any>(`assets/data/job-type.json`);
	}

	findAppliedStatus(): Observable<any> {
		return this.http.get<any>(`assets/data/status.json`);
	}

	create(body: CreateActivityDTO): Observable<CreateActivityDTO> {
		return this.http
			.post<HttpResponseEntity<CreateActivityDTO>>(`${this.env}/activity`, body)
			.pipe(
				map((response) => response.data),
				catchError((error: HttpErrorResponse) => handlerHttpError(error))
			);
	}

	update(id: string, body: UpdateActivityDTO): Observable<string> {
		return this.http
			.patch<HttpResponseEntity<UpdateActivityDTO>>(`${this.env}/activity/${id}`, body)
			.pipe(
				map((response) => response.message),
				catchError((error: HttpErrorResponse) => handlerHttpError(error))
			);
	}

	remove(id: string): Observable<string> {
		return this.http
			.delete<HttpResponseEntity<CreateActivityDTO>>(`${this.env}/activity/${id}`)
			.pipe(
				map((response) => response.message),
				catchError((error: HttpErrorResponse) => handlerHttpError(error))
			);
	}
}
