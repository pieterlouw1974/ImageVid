// angular
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// model
import { CategoryModel } from '../models/CategoryModel';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CategoryService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'});
  actionUrl = 'http://localhost:5000/api/Category';

  constructor(private http: HttpClient) {}

  getCategorys(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.actionUrl).pipe(
      map(res => {
        // const a = res['data'];
        return res;
      }),
      catchError(this.handleError)
    );
  }

  insertCategory(cat: CategoryModel): any {
    return this.http.post<CategoryModel>(this.actionUrl, cat, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Server error');
  }
}
