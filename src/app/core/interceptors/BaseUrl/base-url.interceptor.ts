import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../../services/token/token.service';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(private _tokenService: TokenService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this._tokenService.tokenGetter();
    const BaseUrl = "https://upskilling-egypt.com:3006/api/v1";
    request = request.clone({
      url: `${BaseUrl}/${request.url}`
    });

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this._tokenService.logout();
        }
        //const error = err.error || err.statusText;
        return throwError(() => err);
      })
    );
  }
}
