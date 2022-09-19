import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(
        private http: HttpClient
    ) { }

/*
{
    "loggedAccountUuid": "c7c7a530-7d59-4179-b763-cb2b2d871735",
    "accountUuid": "de829ab9-6a1f-4b2a-800f-cc29aa399246"
}
*/
    insertChat(accountUuid: any):Observable<any> {
        // request param
        let queryParams = {};
        queryParams = {
        headers: this.headers,
            observe: 'response',
            params: new HttpParams()
                .set('accountUuid', String(accountUuid)),
                
        };
        return this.http.post(`${environment.chat}`,queryParams);
    }

    getChatsByAccount() :Observable<any> {
        return this.http.get(`${environment.chat}`,
          {headers: this.headers, responseType: 'json'}).pipe(map(res => res));
    }

    /*
{
    "text": "cao",
    "accountUuid": "de829ab9-6a1f-4b2a-800f-cc29aa399246"
}
    */

    insertMessage(data: any):Observable<any> {
        return this.http.post(`${environment.message}`, data,
        {headers: this.headers, responseType: 'json'});
    }

    getMessagesByChat(uuid: any) :Observable<any> {
        return this.http.get(`${environment.message}/${uuid}`,
        {headers: this.headers, responseType: 'json'}).pipe(map(res => res));
    }

   
}
