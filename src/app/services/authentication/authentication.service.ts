import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../../model/User';
import { environment } from 'src/environments/environment';
import { query } from '@angular/animations';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(
        private http: HttpClient
    ) { }

    login(auth: any): Observable<any> {
        return this.http.post(`${environment.authUrl}/${environment.login}`,
         {username: auth.username, password: auth.password}, {headers: this.headers, responseType: 'json'});
    }

    isLoggedIn(): boolean {
        if (!localStorage.getItem('user')) {
                return false;
        }
        console.log("tu je")
        return true;
    }

    register(data: any): Observable<any> {
        console.log("Dataa reg")
        console.log(data)
        console.log("Dataa name")
        console.log(data.gender)
        return this.http.post(`${environment.authUrl}/${environment.signUp}`, {name: data.name,
			phone: data.phone, gender: data.gender, password: data.password, email: data.email, username: data.username}, {headers: this.headers, responseType: 'json'});
    }


    signOut(): void {
        localStorage.removeItem('user');
    }

    changePassword(passwordData: any): Observable<any> {
        return this.http.post(`${environment.authUrl}/${environment.changePassword}`,
         {oldPassword: passwordData.oldPassword, newPassword: passwordData.newPassword}, {headers: this.headers, responseType: 'json'});
    }


    signUp(data: any):  Observable<any> {
		return this.http.post(`${environment.authUrl}/${environment.signUp}`, {firstName: data.firstName,
			lastName: data.lastName, username: data.email, password: data.password}, {headers: this.headers, responseType: 'json'});
	
	}
    validateToken(): Observable<any>{
        const item = localStorage.getItem('user'); // || "{}";

        if (item) {
            const decodedItem = JSON.parse(item);
            let queryParams = {};
                queryParams = {
                headers: this.headers,
                observe: 'response',
                params: new HttpParams()
                    .set('token', String(decodedItem.token)),
                
        };
        return this.http.get(`${environment.authUrl}/validate-token`, queryParams).pipe(map(res => res));
          
    }
    else {
        throw console.error();
        
    }
}

}
