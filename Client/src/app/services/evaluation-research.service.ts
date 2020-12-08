import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router';
import { Observable,of,pipe } from 'rxjs'
import { map, catchError} from 'rxjs/operators';

export interface Response{
  message:string;
  success: boolean;
  errcode:string;
}

const endpoint = 'http://localhost:2011';

@Injectable({
  providedIn: 'root'
})
export class EvaluationResearchService {
  private jwtToken:string;

  constructor(private http: HttpClient) { }

  public getData(){
    let headers = new HttpHeaders();
  	headers.append('Content-Type', 'application/json');
  	headers.append('Authorization', `${this.jwtToken}`);
    let options = {headers:headers};
    
    return this.http.get(endpoint + '/evaluate/research', options)
    .pipe(map(response => response),
  			catchError(this.handleError<any>('getMessage')));
  }

  public getDataById(id){
    let headers = new HttpHeaders();
  	headers.append('Content-Type', 'application/json');
  	headers.append('Authorization', `${this.jwtToken}`);
    let options = {headers:headers};
    
    return this.http.get(endpoint + '/evaluate/research/' + id , options)
    .pipe(map(response => response),
  			catchError(this.handleError<any>('getMessage')));
  }

  public sendEvalResearch(form):Observable<Response>{
    let headers = new HttpHeaders({'Content-Type':'application/json'});
  	headers.append('Authorization', `${this.jwtToken}`);
    let options = {headers:headers};

    return this.http.post<Response>(endpoint + '/evaluate/research', JSON.stringify(form), options)
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
