// angular
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// model
import { SubCategoryModel } from '../models/SubCategoryModel';

@Injectable()
export class SubCategoryService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  actionUrl = 'http://localhost:5000/api/SubCategory';

  constructor(private http: HttpClient) {}

  getSubCategorys(catid: number): Observable<SubCategoryModel[]> {
    return this.http.get<SubCategoryModel[]>(this.actionUrl + '/' + catid).pipe(
      map(res => {
        // const a = res['data'];
        return res;
      }),
      catchError(this.handleError)
    );
  }

  insertSubCategory(cat: SubCategoryModel): any {
    return this.http.post<SubCategoryModel>(this.actionUrl, cat, { headers: this.headers }).pipe(catchError(this.handleError));
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
