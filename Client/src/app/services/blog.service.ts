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
export class BlogService {

  constructor(private http:HttpClient) { }

  private extractData(res: Response){
  	let body = res;
  	return body || {};
  }

  //to get all consultancy request data
  getBlogs(){
  	return this.http.get(endpoint + '/blogs')
  	.pipe(map(this.extractData));
  }

  //get a single request by id
  getBlogById(id){
  	return this.http.get(endpoint + '/blogs/' + id)
  	.pipe(map(this.extractData));
  }

  //send consulatancy request data to api
  createBlog(blog): Observable<any> {
  	return this.http.post<any>(endpoint + '/blogs', JSON.stringify(blog), httpOptions)
  	.pipe(tap((blog) => console.log('added blog, id=${blog.id}')),
  		catchError(this.handleError<any>('addBlog')));
  }

  //update item
  updateBlog(id,blog): Observable<any> {
    return this.http.put<any>(endpoint + '/blogs/'+ id, JSON.stringify(blog), httpOptions)
    .pipe(tap(_ => console.log(`update blog id=${id}`)),
      catchError(this.handleError<any>('updateBlog')));
  }
  deleteBlog(id): Observable<any>{
  	return this.http.delete<any>(endpoint+ '/blogs/' + id, httpOptions)
  	.pipe(
  		tap(_ => console.log(`delete blog id=${id}`)),
  		catchError(this.handleError<any>('deleteblog'))
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
