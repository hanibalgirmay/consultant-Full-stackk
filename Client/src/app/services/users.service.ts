import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError} from 'rxjs/operators';
import { Observable , of} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import { ClientUser } from '../forms/model/clientUser';

const httpOptions = {
	headers: new HttpHeaders({
		'content-type': 'application/json'
	})
}

const endpoint = 'http://localhost:2011';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  dataChange: BehaviorSubject<ClientUser[]> = new BehaviorSubject<ClientUser[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private http: HttpClient) { }

  get data(): ClientUser[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  private extractData(res: Response){
  	let body = res;
  	return body || {};
  }

  // send replay
  send(replay){
    return this.http.post(endpoint + '/users/sendReplay' , JSON.stringify(replay), httpOptions)
    .pipe(
      tap((replay) => console.log(`message is sent`)),
        catchError(this.handleError<any>('message failed'))
      );
  }

  //to get all Users request data
  getUsers(){
  	return this.http.get(endpoint + '/Users')
  	.pipe(map(this.extractData));
  }

  //get a single user by id
  getUsersById(id){
  	return this.http.get(endpoint + '/Users/' + id)
  	.pipe(map(this.extractData));
  }

  //delete users
  deleteUsers(id): Observable<any>{
  	return this.http.delete<any>(endpoint+ '/users/' + id, httpOptions)
  	.pipe(
  		tap(_ => console.log(`delete user id=${id}`)),
  		catchError(this.handleError<any>('deleteUser'))
  		);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
