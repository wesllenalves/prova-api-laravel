import { Pessoa } from './../interface/pessoa';
import { environment } from './../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, mapTo, mergeMap } from 'rxjs/operators';

import { CredentialsService } from './credentials.service';
import { User } from '../interface/user';
import { Tokens } from '../interface/tokens';

export interface LoginContext {
  username: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private credentialsService: CredentialsService, private http: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: { username: string; password: string; remember: boolean }): Observable<boolean> {
    // Replace by proper authentication call
    /* const data = {
      username: context.username
    }; */

    //console.log(data);
    //this.credentialsService.setCredentials(data, context.remember);

    return this.http.post<any>(`${environment.serverUrl}/auth/login`, context).pipe(
      tap(tokens => {
        this.doLoginUser(context.username, tokens), this.credentialsService.setCredentials(tokens, context.remember);
      }),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  public logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    this.doLogoutUser();
    return of(true);

    /* this.http.get(`${environment.serverUrl}/auth/logout`).pipe(
      tap(() => {this.doLogoutUser(); this.credentialsService.setCredentials();}),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
      return of(true); */
  }

  getUser(): User {
    return localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : null;
  }

  getPessoa() {
    return this.http.get(`${environment.serverUrl}/pesssoas`);
  }

  AddPessoa(Pessoa: any) {
    return this.http.post(`${environment.serverUrl}/pesssoas/add`, Pessoa);
  }

  setUser(): Observable<boolean> {
    return this.http.get<any>(`${environment.serverUrl}/auth/me`).pipe(
      tap(val => {
        console.log(val);
      }),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    );
    return of(true);
  }

  refreshToken() {
    //let headers = new HttpHeaders().set('Authorization', `Bearer ${this.getJwtToken()}`);

    return this.http
      .post<any>(
        `${environment.serverUrl}/auth/refresh`,
        {},
        { headers: new HttpHeaders({ Authorization: `Bearer ${this.getJwtToken()}` }) }
      )
      .pipe(
        mergeMap(tokens => {
          console.log(tokens.token);
          return tokens;
        })
        /* tap((tokens: Tokens) => {
      console.log(tokens);
      this.storeJwtToken(tokens.token);
      }) */
      );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  /* getJwtToken() {
    const credential = localStorage.getItem(this.JWT_TOKEN);
    return JSON.parse(credential).token;
  } */

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.token);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
