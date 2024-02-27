import { Categories, Category } from '../models/category';
import { EmptyError, Observable, catchError, map } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { CategoryDTO } from '../dto/create-category.dto';
import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';
import { handlerHttpError } from '../utils/error-handler';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  env = 'http://localhost:3000';
  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<Categories> {
    return this.http
      .get<HttpResponseEntity<Categories>>(`${this.env}/category`)
      .pipe(map((response) => response.data));
  }

  findOne(id: string): Observable<Category> {
    return this.http.get<HttpResponseEntity<Category>>(`${this.env}/category/${id}`).pipe(
      map((response) => response.data),
      catchError((error: HttpErrorResponse) => handlerHttpError(error))
    );
  }

  create(body: CategoryDTO): Observable<Category> {
    return this.http.post<HttpResponseEntity<Category>>(`${this.env}/category`, body).pipe(
      map((response) => response.data),
      catchError((error: HttpErrorResponse) => handlerHttpError(error))
    );
  }

  update(id: string, body: CategoryDTO): Observable<string> {
    return this.http
      .patch<HttpResponseEntity<Category>>(`${this.env}/category/${id}`, body)
      .pipe(
        map((response) => response.message),
        catchError((error: HttpErrorResponse) => handlerHttpError(error))
      );
  }


  searchWithPaging(
    query?: string,
    page?: number,
    perPage?: number): Observable<any> {
    let endpoint = `${this.env}/category/search`;

    // Construct query parameters if provided
    const params: { [param: string]: string } = {};
    if (query) params['query'] = query;
    if (page) params['page'] = page.toString();
    if (perPage) params['perPage'] = perPage.toString();

    // Construct URL with query parameters
    if (Object.keys(params).length > 0) {
      const queryParams = new URLSearchParams(params).toString();
      endpoint += `?${queryParams}`;
    }

    return this.http.get<any>(endpoint, { observe: 'response' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return handlerHttpError(error);
        })
      );
  }

  remove(id: string): Observable<string> {
    return this.http.delete<HttpResponseEntity<Category>>(`${this.env}/category/${id}`).pipe(
      map((response) => response.message),
      catchError((error: HttpErrorResponse) => handlerHttpError(error))
    );
  }
}


