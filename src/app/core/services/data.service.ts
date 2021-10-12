import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData<T>(controller: String, action: string = ""): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${controller}/${action}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }


  getDataByParam<T>(paramName: any, paran: any, controller: String, action: string = "") {
    return this.http.get<T>(`${environment.apiUrl}/${controller}/${action}?` + paramName + `=${paran}`,

    ).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  postJsonData<T>(data: any, controller: String, action: string = "") {
    const headers = { 'Content-Type': 'application/json' }
    return this.http.post<T>(`${environment.apiUrl}/${controller}/${action}`, JSON.stringify(data), { headers })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      let errorMessage: string = "Oops! Server is not reachable";
      if (error.status == 401)
        errorMessage = "Oops! Unthorized access";
      else if (error.status != 0)
        errorMessage = `Oops! Server not responding, Error Code: ${error.status} `

      /// Can report message to UI here by Toast or Snackbar

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error?.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
