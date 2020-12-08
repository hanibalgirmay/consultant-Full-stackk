import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Partner } from '../forms/model/partner';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'enctype': 'multipart/form-data',
  })
}

const endpoint = 'http://localhost:2011'

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http: HttpClient) { }

   private extractData(res: Response) {
    let body = res;
    return body || { };
  }


  //get all the partnenrs from API
  getPartners(): Observable<any> {
  	return this.http.get('http://localhost:2011/partner/me')
  		// .pipe(map((response: Response) => response.json()));
      .pipe(map(this.extractData));
  }

  //get partners by their ID
  getPartnerById(id): Observable<Partner[]> {
  	return this.http.get<Partner[]>('http://localhost:2011/partner/me/'+id)
    // .pipe(map(this.extractData));
  		// .pipe(map((res: Response) => res.json()));
  }

  addPartner (form): Observable<any> {
    console.log(name);
    // const form= new FormData();//Crea un formulario
        // form.append('name', name);
        // form.append('websiteLink', webisiteLink);
        // form.append('phoneNumber', phoneNumber);
        // form.append('description', description);
        // form.append('partnerImage',partnerImage);
    return this.http.post<Object>('http://localhost:2011/partner/me', JSON.stringify(form), httpOptions).pipe(
      tap((partner) => console.log(`added partner`)),
      catchError(this.handleError<any>('addPartner'))
    );
  }

  //update partner item
  updatePartner (id, partner): Observable<any> {
    return this.http.put(endpoint + '/partner/me/' + id, JSON.stringify(partner), httpOptions).pipe(
      tap(_ => console.log(`updated partner id=${id}`)),
      catchError(this.handleError<any>('updatePartner'))
    );
  }

  // delete partner
  deletePartner (id): Observable<any> {
    return this.http.delete<any>(endpoint + '/partner/me/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted partner id=${id}`)),
      catchError(this.handleError<any>('deletePartner'))
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
