import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, pipe,of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface User{
  message:string;
  success: boolean;
  errcode:string;
}

const endpoint = 'http://localhost:2011';

@Injectable({
  providedIn: 'root'
})
export class EvaluationConsultService {
  public jwtToken: string;

  constructor(private http:HttpClient) { 
    const theUser:any = JSON.parse(localStorage.getItem('currentUser'));
  	if(theUser){
  		this.jwtToken = theUser.token;
  	}
  }

  // private extractData(res: Response){
  // 	let body = res;
  // 	return body || {};
  // }

  public getData(){
    let headers = new HttpHeaders();
  	headers.append('Content-Type', 'application/json');
  	headers.append('Authorization', `${this.jwtToken}`);
    let options = {headers:headers};
    
    return this.http.get(endpoint + '/evaluate/consultant', options)
    .pipe(map(response => response),
  			catchError(this.handleError<any>('getMessage')));
  }

  public getDataById(id){
    let headers = new HttpHeaders({'Content-Type':'application/json'});
  	headers.append('Content-Type', 'application/json');
  	headers.append('Authorization', `${this.jwtToken}`);
    let options = {headers:headers};
    
    return this.http.get(endpoint + '/evaluate/consultant/' + id, options)
    .pipe(map(response => response),
  			catchError(this.handleError<any>('getMessageById')));
  }

  public sendEval(form):Observable<User>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
  	// headers.set('Content-Type', 'application/json');
  	headers.append('Authorization', `${this.jwtToken}`);
    let options = {headers:headers};

    return this.http.post<User>(endpoint + '/evaluate/consultant', JSON.stringify(form), options)
    .pipe(map(response => response),
  			catchError(this.handleError<any>('SendMessage')));

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
