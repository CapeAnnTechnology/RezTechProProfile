import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError as ObservableThrowError, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { UserModel } from './../_models';

import { MessageService } from './message.service';
import { AuthService } from './auth.service';

import { environment } from './../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = environment.API_URI;  // URL to web api

  constructor( private http: HttpClient,
               private messageService: MessageService,
               private auth: AuthService,
    ) { }

  private get _authHeader(): string {
    return `Bearer ${this.auth.accessToken}`;
  }

  // GET user
  getUser$(): Observable<UserModel> {
    const sub = this.auth.userProfile.sub;
    return this.http
      .get<UserModel>(`${environment.BASE_API}user/${sub}/`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // GET an user by ID (login required)
  getUserById$(id: string): Observable<UserModel> {
    return this.http
      .get<UserModel>(`${environment.BASE_API}user/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }


  // PUT existing event (admin only)
  editUser$(id: string, user: UserModel): Observable<UserModel> {
    return this.http
      .put<UserModel>(`${environment.BASE_API}user/${id}`, user, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // PUT existing event (admin only)
  postUser$(user: UserModel): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${environment.BASE_API}user/create`, user, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for venue consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.auth.login();
    }
    return ObservableThrowError(errorMsg);
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add('VenueService: ' + message);
  }
}
