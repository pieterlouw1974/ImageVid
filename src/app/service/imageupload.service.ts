// angular
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
// model
import { ImageModel } from '../models/ImageModel';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ImageViewModel } from '../models/ImageViewModel';

@Injectable()
export class ImageUploadService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'});
  actionUrl = 'http://localhost:5000/api/Images';

  constructor(private http: HttpClient) {}


  getImages(cat, subcat): Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>(this.actionUrl + '/' + cat + ',' + subcat).pipe(
      map(res => {
        // const a = res['data'];
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getOneImage(id): Observable<ImageModel> {
    return this.http.get<ImageModel>(this.actionUrl + '/' + id).pipe(
      map(res => {
        // const a = res['data'];
        return res;
      }),
      catchError(this.handleError)
    );
  }

  insertImage(img: ImageModel): any {
    return this.http.post<ImageModel>(this.actionUrl, img, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteImage(id: number): any {
    return this.http.delete(this.actionUrl + '/' + id, { headers: this.headers }).pipe(
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
