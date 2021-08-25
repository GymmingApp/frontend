import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment';

interface Exercise {
  id: number;
  name: string;
  series: number;
  times: number;
  wight: number;
  observations: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.serverHost;
  }

  public list(): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.host}/exercise`);
  }

  public create(body: Exercise): Observable<Exercise> {
    console.log('enviando', body, this.host);
    // @ts-ignore
    return this.http.post<Exercise>(`${this.host}/exercise`, body)/*.pipe(
      retry(1),
      catchError(this.httpError))*/;
  }

  httpError<T>(error): Observable<T> {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
