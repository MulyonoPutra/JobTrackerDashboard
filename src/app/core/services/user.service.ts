import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

import { CreateExperienceDto } from '../dto/create-experience.dto';
import { Education } from '../models/education';
import { Experience } from '../models/experience';
import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';
import { UpdateAddressDto } from '../models/dto/update-address.dto';
import { UpdateEducationDto } from '../models/dto/update-education.dto';
import { UpdateExperienceDto } from '../models/dto/update-experience.dto';
import { UpdateUserDto } from '../models/dto/update-user.dto';
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

	updateProfile(body: UpdateUserDto): Observable<UpdateUserDto> {
		return this.http
			.patch<HttpResponseEntity<UpdateUserDto>>(`${this.env}/user/detail`, body)
			.pipe(
				map((response) => response.data),
				catchError((error: HttpErrorResponse) => handlerHttpError(error))
			);
	}

	newAddress(body: UpdateAddressDto): Observable<UpdateAddressDto> {
		return this.http
			.post<HttpResponseEntity<UpdateAddressDto>>(`${this.env}/profile/address`, body)
			.pipe(
				map((response) => response.data),
				catchError((error: HttpErrorResponse) => handlerHttpError(error))
			);
	}

	updateAddress(addressId: string, body: UpdateUserDto): Observable<UpdateUserDto> {
		return this.http
			.patch<HttpResponseEntity<UpdateUserDto>>(
				`${this.env}/profile/address/${addressId}`,
				body
			)
			.pipe(
				map((response) => response.data),
				catchError((error: HttpErrorResponse) => handlerHttpError(error))
			);
	}

	newEducation(body: UpdateEducationDto): Observable<UpdateEducationDto> {
		return this.http
			.post<HttpResponseEntity<UpdateEducationDto>>(`${this.env}/profile/education`, body)
			.pipe(
				map((response) => response.data),
				catchError((error: HttpErrorResponse) => handlerHttpError(error))
			);
	}

	updateEducation(educationId: string, body: UpdateEducationDto): Observable<UpdateEducationDto> {
		return this.http
			.patch<HttpResponseEntity<UpdateEducationDto>>(
				`${this.env}/profile/education/${educationId}`,
				body
			)
			.pipe(
				map((response) => response.data),
				catchError((error: HttpErrorResponse) => handlerHttpError(error))
			);
	}

	removeEducation(id: string): Observable<string> {
		return this.http
			.delete<HttpResponseEntity<Education>>(`${this.env}/profile/education/${id}`)
			.pipe(
				map((response) => response.message),
				catchError((error: HttpErrorResponse) => handlerHttpError(error))
			);
	}

	newExperience(body: CreateExperienceDto[]): Observable<string> {
		return this.http.post<any>(`${this.env}/profile/experience`, body).pipe(
			map((response) => response.message),
			catchError((error: HttpErrorResponse) => handlerHttpError(error))
		);
	}

	updateExperience(experienceId: string, body: UpdateExperienceDto): Observable<string> {
		return this.http
			.patch<HttpResponseEntity<UpdateExperienceDto>>(
				`${this.env}/profile/experience/${experienceId}`,
				body
			)
			.pipe(
				map((response) => response.message),
				catchError((error: HttpErrorResponse) => handlerHttpError(error))
			);
	}

	removeExperience(id: string): Observable<string> {
		return this.http
			.delete<HttpResponseEntity<Experience>>(`${this.env}/profile/experience/${id}`)
			.pipe(
				map((response) => response.message),
				catchError((error: HttpErrorResponse) => handlerHttpError(error))
			);
	}

  findExperience(id: string): Observable<Experience> {
    return this.http.get<HttpResponseEntity<Experience>>(`${this.env}/profile/experience/${id}`).pipe(
      map((response) => response.data),
      catchError((error: HttpErrorResponse) => handlerHttpError(error))
    );
  }
}
