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
export class TrainingService {

  constructor(private http: HttpClient) { }

   private extractData(res: Response){
  	let body = res;
  	return body || {};
  }

  redirectGmail(replay){
    return this.http.post(endpoint + '/training/sendReplay' , JSON.stringify(replay), httpOptions)
    .pipe(
      tap((replay) => console.log(`replay message is sent`)),
        catchError(this.handleError<any>('message failed'))
      );
  }


  //to get all training request data
  getTrainingRequest(){
  	return this.http.get(endpoint + '/training')
  	.pipe(map(this.extractData));
  }

  //get a single request by id
  getTrainingRequetById(id){
  	return this.http.get(endpoint + '/training/' + id)
  	.pipe(map(this.extractData));
  }

  //send training request data to api
  createTraining(training): Observable<any> {
  	return this.http.post(endpoint + '/training', JSON.stringify(training), httpOptions)
  	.pipe(tap((training) => console.log('added training request id=${training.id}')),
  		catchError(this.handleError<any>('addTraining')));
  }

  // update training item
  updateTraining(id, training): Observable<any> {
    return this.http.put(endpoint + '/training/' + id, JSON.stringify(training), httpOptions)
    .pipe(tap(_ => console.log('update training id=${id}')),
      catchError(this.handleError<any>('updateTraining')));
  }

  //delete trainingtRequest
  deleteTrainingRequest(id): Observable<any>{
  	return this.http.delete<any>(endpoint + '/training/' + id, httpOptions)
  	.pipe(
  		tap(_ => console.log('delete training id=${id}')),
  		catchError(this.handleError<any>('deleteTraining'))
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
