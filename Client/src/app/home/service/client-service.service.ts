import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map , tap, catchError} from 'rxjs/operators';
import { observable, throwError, Observable } from 'rxjs';
import { ClientUser } from '../../forms/model/clientUser';
import { User } from 'src/app/Administrator/services/user';

export interface UserResponse {
  success: boolean;
  message: string;
  errcode: string;
  token: string;
  data;
}

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  public jwtToken: string;
  public token: string;
	errorData: {};
	public currentUser: ClientUser;

  constructor(private http: HttpClient) {
    const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
    if (theUser) {
      this.jwtToken = theUser.token;
      const token = this.jwtToken;
      // console.log(this.jwtToken);
    }
  }

  forgot(oUser): Observable<UserResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const options = {headers};

    return this.http.post<UserResponse>('http://localhost:2011/forgot', JSON.stringify(oUser), options)
        .pipe(map(response => response))
        .pipe(catchError(this.handleError));
  }

  reset(oUser, token): Observable<UserResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const options = {headers};

    return this.http.post<UserResponse>('http://localhost:2011/reset/' + token, JSON.stringify(oUser), options)
      .pipe(map(response => response))
      .pipe(catchError(this.handleError));
  }

  register(oUser): Observable<UserResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const options = {headers};

    return this.http.post<UserResponse>('http://localhost:2011/register', JSON.stringify(oUser), options)
        .pipe(map(response => response))
        .pipe(catchError(this.handleError));
  }

  userData(oUser): Observable<UserResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    const options = {headers};

    return this.http.post<UserResponse>('http://localhost:2011/api/user/data', JSON.stringify(oUser), options)
        .pipe(map(response => response))
        .pipe(catchError(this.handleError));
  }

  getUser(userid): Observable<UserResponse> {
    const headers = new HttpHeaders({Authorization: `${this.jwtToken}`});
    headers.set('Content-Type', 'application/json');
    // headers.append('Authorization', `${this.jwtToken}`);
    const options = { headers};

    return this.http.get<UserResponse>('http://localhost:2011/api/user/' + userid, options)
        .pipe(map(response => response))
        .pipe(catchError(this.handleError));

  }

  getUserInfo(userid): Observable<UserResponse> {
    const headers = new HttpHeaders({Authorization: `${this.jwtToken}`});
    headers.set('Content-Type', 'application/json');
    // headers.append('Authorization', `${this.jwtToken}`);
    const options = { headers};

    return this.http.get<UserResponse>('http://localhost:2011/api/user/data/' + userid, options)
        .pipe(map(response => response))
        .pipe(catchError(this.handleError));

  }

  updateUser(userid, oUser): Observable<UserResponse> {
    const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', Authorization: `${this.jwtToken}`});
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', `${this.jwtToken}`);
    const options = { headers};

    return this.http.put<UserResponse>('http://localhost:2011/api/user/data/' + userid, JSON.stringify(oUser), options)
    .pipe(map(response => response))
    .pipe(catchError(this.handleError));
  }

  updatePassword(userid, oUser): Observable<UserResponse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json',Authorization: `${this.jwtToken}`});
    const options = { headers};

    return this.http.put<UserResponse>('http://localhost:2011/api/user/password/' + userid, JSON.stringify(oUser), options)
    .pipe(map(response => response))
    .pipe(catchError(this.handleError));
  }

  isLoggedIn(): boolean {
      try {
        const theUser: any = JSON.parse(localStorage.getItem('currentUser'));
        if (theUser) {
            this.currentUser = theUser.user;
        }
      } catch (e) {
          return false;
      }

      return !!this.currentUser;
  }
  // isPageFilled(): boolean {
  //   try{
  //     const info :any = 
  //   } catch(e){

  //   }
  // }

  public login(oUser): Observable<UserResponse> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});
        const options = {headers};

        return this.http.post<UserResponse>('http://localhost:2011/api/login', JSON.stringify(oUser), options)
        .pipe(tap(user => {
            if (user.success) {
                // this.currentUser = <ClientUser>user.message;
                const userObj: any = {};
                userObj.user = user.message;
                userObj.token = user.token;

                localStorage.setItem('currentUser', JSON.stringify(userObj));
                // console.log(JSON.stringify(userObj));
            }
            return user;
        }));
  }

  public logout(): void {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
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
}
