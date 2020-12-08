import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError} from 'rxjs/operators';
import { Observable , of} from 'rxjs';

const httpOptions = {
	headers: new HttpHeaders({
		'content-type': 'application/json'
	})
}

const endpoint = 'http://localhost:2011';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response){
  	let body = res;
  	return body || {};
  }

  redirectGmail(replay){
    return this.http.post(endpoint + '/consultant/sendReplay' , JSON.stringify(replay), httpOptions)
    .pipe(
      tap((replay) => console.log(`replay message is sent`)),
        catchError(this.handleError<any>('message failed'))
      );
  }


  //to get all consultancy request data
  getConsultancyRequest(){
  	return this.http.get(endpoint + '/consultant')
  	.pipe(map(this.extractData));
  }

  //get a single request by id
  getConsultancyRequetById(id){
  	return this.http.get(endpoint + '/consultant/' + id)
  	.pipe(map(this.extractData));
  }

  //send consulatancy request data to api
  createConsultancy(consultant): Observable<any> {
  	return this.http.post<any>(endpoint + '/consultant', JSON.stringify(consultant), httpOptions)
  	.pipe(tap((consultant) => console.log('added consultancy request id=${consultant.id}')),
  		catchError(this.handleError<any>('addConsultant')));
  }

  //update item
  updateConsultancy(id,consultant): Observable<any> {
    return this.http.put(endpoint + id, JSON.stringify(consultant), httpOptions)
    .pipe(
      tap(
        _ => console.log('update consultant id=${id}')),
      catchError(this.handleError<any>('updateConsultant')));
  }

  //delete consultantRequest
  deleteConsultantRequest(id): Observable<any>{
  	return this.http.delete<any>(endpoint+ '/consultant/' + id, httpOptions)
  	.pipe(
  		tap(_ => console.log('delete consultant id=${id}')),
  		catchError(this.handleError<any>('deleteConsultant'))
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
