// angular
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { CatSubCatVideoModel } from '../models/CatSubCatVideoModel';
import { VideoList } from '../models/VideoListModel';
import { VideoModel } from '../models/VideoModel';
@Injectable()
export class VideoService {
  actionUrl = 'http://localhost:5000/api/Video';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  upload(fileToUpload: any): any {
    const input = new FormData();
    input.append('file', fileToUpload);

    return this.http.post(this.actionUrl, input).pipe(
      catchError(this.handleError)

      // return this.http
      //   .post(this.actionUrl, input);
    );
  }

  uploadCatSubcat(CatSubCatVideo: CatSubCatVideoModel): any {
    return this.http.put(this.actionUrl, CatSubCatVideo).pipe(
      catchError(this.handleError)
    );
  }

  getVideoList(cat, subcat): Observable<VideoList[]> {
    return this.http.get<VideoList[]>(this.actionUrl + '/' + cat + ',' + subcat).pipe(
      map(res => {
        // const a = res['data'];
        return res;
      }),
      catchError(this.handleError)
    );
  }

  getOneVideo(id): Observable<VideoModel> {
    return this.http.get<VideoModel>(this.actionUrl + '/' + id).pipe(
      map(res => {
        // const a = res['data'];
        return res;
      }),
      catchError(this.handleError)
    );
  }

  deleteVideo(id: number): any {
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
