import { Injectable } from '@angular/core';
import { HttpClientModule, HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../../model/User';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountsService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(
        private http: HttpClient
    ) { }

    /*
@RequestParam String pattern, Pageable pageable
    */
    getAllAccounts(page: number, size: number):Observable<any> {
        let queryParams = {};
        queryParams = {
        headers: this.headers,
            observe: 'response',
            params: new HttpParams()
                .set('page', String(page))
                .append('size', String(size))
                .append('pattern', ''),
        };
        return this.http.get(`${environment.accountUrl}/search`,
          queryParams).pipe(map(res => res));
    }
    
    getAccountByUuid(uuid: any):Observable<any> {
        return this.http.get(`${environment.accountUrl}/${uuid}`,
          {headers: this.headers, responseType: 'json'}).pipe(map(res => res));
    }

    searchAccounts(pattern: any, page: number, size: number):Observable<any> {
        let queryParams = {};
        queryParams = {
        headers: this.headers,
            observe: 'response',
            params: new HttpParams()
                .set('page', String(page))
                .append('size', String(size))
                .append('pattern', String(pattern)),
        };
        return this.http.get(`${environment.accountUrl}/search`,
        queryParams).pipe(map(res => res));
    }

    editAccount(data: any):Observable<any> {
        return this.http.put(`${environment.accountUrl}`, data,
          {headers: this.headers, responseType: 'json'});
    }

    //search 
    //http://localhost:8087/accounts/search?pattern=pec
    //localhost:8087/follow-requests/6e83d9c0-b462-47da-81fd-810500a4f7e2

    sendFollowRequest(uuid: any): Observable<any> {
        return this.http.post(`${environment.followRequest}/${uuid}`,
         {headers: this.headers, responseType: 'json'});
    }

    getFollowRequests(): Observable<any> {
        return this.http.get(`${environment.followRequest}`,
         {headers: this.headers, responseType: 'json'}).pipe(map(res => res));
    }

    //localhost:8087/follow-requests/approve/6e83d9c0-b462-47da-81fd-810500a4f7e2
    approveFollowRequest(uuid: any): Observable<any> {
        return this.http.post(`${environment.followRequest}/approve/${uuid}`,
         {headers: this.headers, responseType: 'json'});
    }
    declineFollowRequest(uuid: any): Observable<any>{
        return this.http.post(`${environment.followRequest}/decline/${uuid}`,
         {headers: this.headers, responseType: 'json'});
    }
    //localhost:8087/follows/followers/6e83d9c0-b462-47da-81fd-810500a4f7e2
    getFollowers(uuid: any): Observable<any> {
        return this.http.get(`${environment.follows}/followers/${uuid}`,
         {headers: this.headers, responseType: 'json'}).pipe(map(res => res));
    }

    getFollowing(uuid: any): Observable<any> {
        return this.http.get(`${environment.follows}/following/${uuid}`,
         {headers: this.headers, responseType: 'json'}).pipe(map(res => res));
    }

    //localhost:8087/accounts/education
    insertEducation(education: any): Observable<any>{
        return this.http.post(`${environment.accountUrl}/education`, education,
         {headers: this.headers, responseType: 'json'});
    }
    
    insertWork(work: any): Observable<any>{
        return this.http.post(`${environment.accountUrl}/work`, work,
         {headers: this.headers, responseType: 'json'});
    }
//localhost:8087/accounts/work/6b955038-5e92-493a-91d7-aa722c56adf2
    deleteWork(uuid:any) : Observable<any>{
        return this.http.delete(`${environment.accountUrl}/work/${uuid}`,
         {headers: this.headers, responseType: 'json'});
    }

    deleteEducation(uuid:any) : Observable<any>{
        return this.http.delete(`${environment.accountUrl}/education/${uuid}`,
         {headers: this.headers, responseType: 'json'});
    }

   
}
