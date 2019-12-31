import { environment } from './../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';
import { User } from '../interface/user';

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
  constructor(private credentialsService: CredentialsService, private http: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext){
    // Replace by proper authentication call
    const data = {
      username: context.username
    };

    
    //console.log(data);
    //this.credentialsService.setCredentials(data, context.remember);

    return this.http.post(`${environment.serverUrl}/auth/login`, context).pipe(
        tap( val => {this.credentialsService.setCredentials(val, context.remember);})
      );    
    }


  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): void {
    // Customize credentials invalidation here
    
    this.http.get(`${environment.serverUrl}/auth/logout`).subscribe( resp =>{
      console.log(resp);
      this.credentialsService.setCredentials();
    });
    //return of(true);
  }

  getUser(): User{
    return localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : null; 
  }

  setUser(): Promise<boolean>{
    return this.http.get<any>(`${environment.serverUrl}/auth/me`).toPromise().then(data => {
      if(data.user){        
        this.credentialsService.setCredentials(data.user, true)
        return true;
      }
      return false;
    });
  }

  refreshToken() {
    return this.http.post(`${environment.serverUrl}/auth/refresh`, {});
  }
}
