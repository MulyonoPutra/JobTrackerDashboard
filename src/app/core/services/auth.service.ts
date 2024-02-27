import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

import { Credentials } from '../models/credentials';
import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { handlerHttpError } from '../utils/error-handler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  env = 'http://localhost:3000';
  constructor(private readonly http: HttpClient) { }

  login(body: Login): Observable<Credentials> {
    return this.http.post<HttpResponseEntity<Credentials>>(`${this.env}/auth/login`, body).pipe(
      map((response) => response.data),
      catchError((error: HttpErrorResponse) => handlerHttpError(error))
    )
  }

  register(body: Register): Observable<Credentials> {
    return this.http.post<HttpResponseEntity<Credentials>>(`${this.env}/auth/register`, body).pipe(
      map((response) => response.data),
      catchError((error: HttpErrorResponse) => handlerHttpError(error))
    )
  }

}
