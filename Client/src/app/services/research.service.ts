import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError} from 'rxjs/operators';
import { Observable , of} from 'rxjs';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-type': 'application/json'
	})
}

const endpoint = 'http://localhost:2011';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response){
  	let body = res;
  	return body || {};
  }

  redirectGmail(replay){
    return this.http.post(endpoint + '/research/sendReplay' , JSON.stringify(replay), httpOptions)
    .pipe(
      tap((replay) => console.log(`replay message is sent`)),
        catchError(this.handleError<any>('message failed'))
      );
  }


  //to get all research request data
  getResearchRequest(){
  	return this.http.get(endpoint + '/research')
  	.pipe(map(this.extractData));
  }

  //get a single request by id
  getResearchRequetById(id){
  	return this.http.get(endpoint + '/research/' + id)
  	.pipe(map(this.extractData));
  }

  //send research request data to api
  createResearchRequest(research): Observable<any> {
  	return this.http.post(endpoint + '/research', JSON.stringify(research), httpOptions)
  	.pipe(tap((research) => console.log('added research request id=${research.id}')),
  		catchError(this.handleError<any>('addResearch')));
  }

  // update research
  updateResearch(id,research): Observable<any> {
    return this.http.put<any>(endpoint + '/research/' + id, JSON.stringify(research), httpOptions).pipe(
      tap(_ => console.log('update research id=${id}')),
      catchError(this.handleError<any>('updateResearch'))
      );
  }

  //delete researchRequest
  deleteResearchRequest(id): Observable<any>{
  	return this.http.delete<any>(endpoint+ '/research/' + id, httpOptions)
  	.pipe(
  		tap(_ => console.log('delete research id=${id}')),
  		catchError(this.handleError<any>('deleteResearch'))
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
