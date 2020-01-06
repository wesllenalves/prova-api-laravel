import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, switchMap, mergeMap, retry } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AuthenticationService } from '../authentication/authentication.service';
import { CredentialsService } from '../authentication/credentials.service';
import { Router } from '@angular/router';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';
  private token = localStorage.getItem('JWT_TOKEN');
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(
    private auth: AuthenticationService,
    private injector: Injector,
    private credentials: CredentialsService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
    }

    //request = this.addAuthenticationToken(request);

    const token = localStorage.getItem('REFRESH_TOKEN');
    let refresh = false;

    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        //console.log('error refresh '+errorResponse);
        let error = typeof errorResponse.error != 'object' ? JSON.parse(errorResponse.error) : errorResponse.error;
        //console.log('error fora '+ error.error);
        let newHeaders = request.headers;
        if (errorResponse.status === 401 && error.error === 'Token_has_expired') {
          refresh = true;
          console.log('error refresh dentro do if ' + errorResponse.error.error);
          const http = this.injector.get(HttpClient);

          return http.post(`${environment.serverUrl}/auth/refresh`, {}).pipe(
            switchMap(token => {
              //localStorage.setItem('JWT_TOKEN', token.token);
              const NewRequest = request.clone();
              return next.handle(NewRequest);
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              console.log(errorResponse);

              return throwError(errorResponse);
            })
          );
        }
        if (refresh != false) {
          localStorage.removeItem('JWT_TOKEN');
          localStorage.removeItem('REFRESH_TOKEN');
          localStorage.removeItem('credentials');
          this.router.navigate(['/login'], { replaceUrl: true });
        }
        //return next.handle(request);
        //return throwError(errorResponse);
      })
    );
  }
  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.token)
    });
  }
}
