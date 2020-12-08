import { Injectable } from '@angular/core';
import { observable, throwError, Observable } from 'rxjs';
import { tap , map, catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';
import { environment } from '../../../environments/environment';

export interface UserResponse {
  success: boolean;
  message: string;
  errcode: string;
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: User;
  errorData: {};

  // noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }


  isLoggedIn(): boolean {
      try {
          const theUser:any = JSON.parse(localStorage.getItem('adminUser'));
          if (theUser) {
              this.currentUser = theUser.user;
          }
      } catch (e) {
          return false;
      }

      return !!this.currentUser;
  }

  login(oUser):Observable<UserResponse> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        let options = {headers: headers};

        return this.http.post<UserResponse>('http://localhost:2011/aau/admin/login', JSON.stringify(oUser), options)
        .pipe(map(response => {
            if(response.success) {
                // this.currentUser = <User>response.message;
                let userObj: any = {};
                userObj.user = response.message;
                userObj.token = response.token;

                localStorage.setItem('adminUser', JSON.stringify(userObj));
            }
            return response;
        }));
        // .pipe(catchError(this.handleError));
    }

    logout(): void {
        this.currentUser = null;
        localStorage.removeItem('adminUser');
    }

    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {

        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {

        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      }

      // return an observable with a user-facing error message
      this.errorData = {
        errorTitle: 'Oops! Request for document failed',
        errorDesc: 'Something bad happened. Please try again later.'
      };
      return throwError(this.errorData);
    }

  //HttpMethods

  // postUser(user: User){
  //   return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  // }

  // login(authCredentials) {
  //   return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  // }

  // getUserProfile() {
  //   return this.http.get(environment.apiBaseUrl + '/userProfile');
  // }


  // //Helper Methods

  // setToken(token: string) {
  //   localStorage.setItem('token', token);
  // }

  // getToken() {
  //   return localStorage.getItem('token');
  // }

  // deleteToken() {
  //   localStorage.removeItem('token');
  // }

  // getUserPayload() {
  //   var token = this.getToken();
  //   if (token) {
  //     var userPayload = atob(token.split('.')[1]);
  //     return JSON.parse(userPayload);
  //   }
  //   else
  //     return null;
  // }

  // isLoggedIn() {
  //   var userPayload = this.getUserPayload();
  //   if (userPayload)
  //     return userPayload.exp > Date.now() / 1000;
  //   else
  //     return false;
  // }
}
