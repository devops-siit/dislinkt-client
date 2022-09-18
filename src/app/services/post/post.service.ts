import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../../model/User';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(
        private http: HttpClient
    ) { }

/*
{
    "text" : "post"
}
*/
    insertPost(data: any):Observable<any> {
        return this.http.post(`${environment.post}`, data,
          {headers: this.headers, responseType: 'json'});
    }

    getPostsByAccount(uuid: any, page: number, size: number) :Observable<any> {
        let queryParams = {};
        queryParams = {
        headers: this.headers,
            observe: 'response',
            params: new HttpParams()
                .set('page', String(page))
                .append('size', String(size)),
        };
        return this.http.get(`${environment.post}/${uuid}`,
          {headers: this.headers, responseType: 'json'}).pipe(map(res => res));
    }

    likePost(uuid: any) :Observable<any> {
        return this.http.put(`${environment.post}/${uuid}/like`,
          {headers: this.headers, responseType: 'json'});
    }

    dislikePost(uuid: any) :Observable<any> {
        return this.http.put(`${environment.post}/${uuid}/dislike`,
          {headers: this.headers, responseType: 'json'});
    }

    getCommentsByPost(uuid: any, page: number, size: number):Observable<any> {
        let queryParams = {};
        queryParams = {
        headers: this.headers,
            observe: 'response',
            params: new HttpParams()
                .set('page', String(page))
                .append('size', String(size)),
        };
        return this.http.get(`${environment.comment}/${uuid}`,
          {headers: this.headers, responseType: 'json'}).pipe(map(res => res));
    }

    /*
    {
    "text": "Komentar",
    "postUuid": "58fbe626-ac86-4cb8-9560-e24a34ee64f9"
}
    */
    insertComment(data: any):Observable<any> {
        return this.http.post(`${environment.comment}`, data,
          {headers: this.headers, responseType: 'json'});
    }


   
}
