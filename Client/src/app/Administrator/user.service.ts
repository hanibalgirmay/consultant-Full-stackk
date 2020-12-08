import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map ,catchError} from 'rxjs/operators';
import { observable, throwError, Observable } from 'rxjs';

export interface UserResponse {
  success: boolean;
  message: string;
  errcode: string;
  data:object;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
	public jwtToken: string;
	errorData: {};

  constructor(private http:HttpClient) {
  	const theUser:any = JSON.parse(localStorage.getItem('adminUser'));

    if(theUser) {
      this.jwtToken = theUser.token;
    }
  }
  

  register(oUser) : Observable<UserResponse>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    let options = {headers: headers};

    return this.http.post<UserResponse>('http://localhost:2011/aau/admin/register', JSON.stringify(oUser), options)
        .pipe(map(response => response))
        .pipe(catchError(this.handleError));
  }

  getUser(userid):Observable<UserResponse> {
    let headers = new HttpHeaders({'Authorization':`${this.jwtToken}`});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    let options = { headers: headers};

    return this.http.get<UserResponse>('http://localhost:2011/aau/admin/account/' + userid, options)
        .pipe(map(response=> response))
        .pipe(catchError(this.handleError));

  }

  updateUser(userid, oUser):Observable<UserResponse>{
    let headers = new HttpHeaders({'Authorization':`${this.jwtToken}`});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    let options = { headers: headers};

    return this.http.put<UserResponse>(`http://localhost:2011/aau/admin/account/${userid}`, JSON.stringify(oUser), options)
    .pipe(map(response => response))
    .pipe(catchError(this.handleError));
  }

  updatePassword(userid, oUser):Observable<UserResponse>{
    let headers = new HttpHeaders({'Authorization':`${this.jwtToken}`});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    let options = { headers: headers};

    return this.http.put<UserResponse>('http://localhost:2011/aau/admin/account/password/${userid}', JSON.stringify(oUser), options)
    .pipe(map(response=> response))
    .pipe(catchError(this.handleError));
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
