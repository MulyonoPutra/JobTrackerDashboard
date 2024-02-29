import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

import { Credentials } from '../models/credentials';
import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { StorageService } from './storage.service';
import { handlerHttpError } from '../utils/error-handler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  env = 'http://localhost:3000';
  constructor(private readonly http: HttpClient, private readonly _storageService: StorageService) { }

  login(body: Login): Observable<any> {
    return this.http.post<any>(`${this.env}/auth/login`, body).pipe(
      map((response) => {
        this._storageService.setAccessToken(response.data.accessToken) as unknown as string;
        return response.data;
      }),
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
