import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../model/User';
import { environment } from 'src/environments/environment';

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


    signOut(): Observable<any> {
        return this.http.get(`${environment.authUrl}/${environment.signOut}`, {headers: this.headers});

    }

    changePassword(passwordData: any): Observable<any> {
        return this.http.post(`${environment.authUrl}/${environment.changePassword}`,
         {oldPassword: passwordData.oldPassword, newPassword: passwordData.newPassword}, {headers: this.headers, responseType: 'json'});
    }


    signUp(data: any):  Observable<any> {
		return this.http.post(`${environment.authUrl}/${environment.signUp}`, {firstName: data.firstName,
			lastName: data.lastName, username: data.email, password: data.password}, {headers: this.headers, responseType: 'json'});
	
	}

}
