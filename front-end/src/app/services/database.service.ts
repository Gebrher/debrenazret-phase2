import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs';

export interface SignupResponse {
  success: boolean;
  msg: string;
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    authToken: any;
    user: any;
    private url = 'http://localhost:4000/users';
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(private http: HttpClient) { }


    signUpUser( user: any): Observable<SignupResponse> {
      return this.http.post<SignupResponse>(this.url + '/signup', user, { headers: this.headers });
    }


    authenticate( user: any): Observable<SignupResponse> {
      return this.http.post<SignupResponse>(this.url + '/signin', user, { headers: this.headers });
    }

    getProfile(): Observable<SignupResponse> {
      this.loadToken();
      const headers = new HttpHeaders().set('Authorization', this.authToken).set('Content-Type', 'application/json');
      return this.http.get<SignupResponse>(this.url + '/profile',   { headers } );
    }

    updateProfile(user): Observable<SignupResponse> {
      const id = JSON.parse(localStorage.getItem('user')).id;
      const headers = new HttpHeaders().set('Authorization', this.authToken).set('Content-Type', 'application/json');
      return this.http.put<SignupResponse>(`${this.url}/update/${id}`, user,  { headers } ).pipe();
    }

    deleteProfile(): Observable<SignupResponse> {
      const id = JSON.parse(localStorage.getItem('user')).id;
      const headers = new HttpHeaders().set('Authorization', this.authToken).set('Content-Type', 'application/json');
      return this.http.delete<SignupResponse>(`${this.url}/delete/${id}`, {headers} ).pipe();
    }

    storeData(token, user) {
     localStorage.setItem('id_token', token);
     localStorage.setItem('user', JSON.stringify(user));
     this.authToken = token;
     this.user = user;
    }

    loadToken() {
       const token = localStorage.getItem('id_token');
       this.authToken = token;
    }

    signedIn() {
      return tokenNotExpired('id_token');
    }

    signOut() {
      this.authToken = null;
      this.user = null;
      localStorage.clear();
    }
  }

