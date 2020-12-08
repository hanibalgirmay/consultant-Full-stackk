import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Message } from '../forms/model/message';

export interface UserResponse {
	success: boolean;
	message: string;
	data:object;
  }
  
const endpoint = 'http://localhost:2011';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
	public jwtToken: string;

  constructor(private http: HttpClient) { 
  	const theUser:any = JSON.parse(localStorage.getItem('currentUser'));
  	if(theUser){
  		this.jwtToken = theUser.token;
  	}
  }

  private extractData(res : Response){
  	let body = res;
  	return body || {};
  }

  getAllMessage(){
	let headers = new HttpHeaders();
	headers.append('Content-Type', 'application/json');
	headers.append('Authorization', `${this.jwtToken}`);
	let options = {headers:headers};

	return this.http.get('http://localhost:2011/message',options)
	.pipe(map((response: Response) => response),
  			catchError(this.handleError<any>('geting message')));
  }

  // get all data
  sendMessage(userid,oMessage){
  	let headers = new HttpHeaders({'Content-Type': 'application/json'});
  	headers.append('Content-Type', 'application/json');
  	headers.append('Authorization', `${this.jwtToken}`);
  	let options = {headers:headers};

  	return this.http.post(endpoint + '/message/' + userid, JSON.stringify(oMessage), options)
  		.pipe(map((response: Response) => response),
  			catchError(this.handleError<any>('sendMessage')));
  }

  getMessageUser(userid): Observable<any>  {
  	let headers = new HttpHeaders();
  	headers.append('Content-Type', 'application/json');
  	// headers.append('Authorization', `${this.jwtToken}`);
  	let options = {headers:headers};

  	return this.http.get(endpoint + '/message/report/' + userid ,options)
  		.pipe(map((response: Response) => response),
  			catchError(this.handleError<any>('getMessageUser')));
  }

  getMessages(msgid):Observable<UserResponse>{
  	let headers = new HttpHeaders();
  	headers.append('Content-Type', 'application/json');
  	headers.append('Authorization', `${this.jwtToken}`);
  	let options = {headers:headers};

  	return this.http.get<UserResponse>(endpoint + '/message/' + msgid, options)
  		.pipe(map(response => response),
  			catchError(this.handleError<any>('getMessage')));
  }

  deleteMessage(msgid) {
  	let headers = new HttpHeaders();
  	headers.append('Content-Type', 'application/json');
  	headers.append('Authorization', `${this.jwtToken}`);
  	let options = {headers:headers};

  	return this.http.delete(endpoint + '/message/' + msgid, options)
  		.pipe(map((response:Response) => response.json()),
  			catchError(this.handleError<any>('deleteMessage')));
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
