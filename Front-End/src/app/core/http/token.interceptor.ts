import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { AuthenticationService } from '../authentication/authentication.service';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestUrl: Array<any> = request.url.split('/');
    const ApiUrl: Array<any> = environment.serverUrl.split('/');
    const token = localStorage.getItem('JWT_TOKEN');
    if (token && requestUrl[2] === ApiUrl[2]) {
      const NewRequest = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      return next.handle(NewRequest);
    }
    return next.handle(request);
  }
}
