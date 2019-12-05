import { Injectable } from '@angular/core';
import { LocalStorage } from './local-storage.util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(
    private storage: LocalStorage,
    private http: HttpClient
  ) {}

  authHeader(): any {
    return {
      Authorization: this.storage.get('accessToken'),
      UserId: this.storage.get('userId')
    }
  }

  createAuthorizationHeader(skipAuth?: boolean): any {
    let headerParams = {};

    if (!skipAuth) {
      headerParams = this.authHeader();
    }

    headerParams['Content-Type'] = 'application/json';

    return headerParams;
  }

  get(url: any, skipAuth?: boolean): any {
    const headers = new HttpHeaders(this.createAuthorizationHeader(skipAuth));

    return this.http.get(url, { headers })
      .pipe(
        catchError(res => {
          return this.commonErrorHandler(res);
        })
      )
  }

  post(url, data, skipAuth?: boolean): any {
    const headers = new HttpHeaders(this.createAuthorizationHeader(skipAuth));
    return this.http.post(url, data, { headers })
      .pipe(
        catchError(res => {
          return this.commonErrorHandler(res);
        })
      )
  }

  put(url, data, skipAuth?: boolean): any {
    const headers = new HttpHeaders(this.createAuthorizationHeader(skipAuth));
    return this.http.put(url, data, { headers })
      .pipe(
        catchError(res => {
          return this.commonErrorHandler(res);
        })
      )
  }

  patch(url, data, skipAuth?: boolean): any {
    const headers = new HttpHeaders(this.createAuthorizationHeader(skipAuth));
    return this.http.patch(url, data, { headers })
      .pipe(
        catchError(res => {
          return this.commonErrorHandler(res);
        })
      )
  }

  delete(url, skipAuth?: boolean): any {
    const headers = new HttpHeaders(this.createAuthorizationHeader(skipAuth));
    return this.http.delete(url, { headers })
      .pipe(
        catchError(res => {
          return this.commonErrorHandler(res);
        })
      )
  }

  private commonErrorHandler(res: any) {
    const body = res.error;
    if (body.errors) {
      body.errors.forEach((err) => {
        this.displayError(err);
        if (res.status === 401) {
          this.storage.clear();
        }
      })
    } else {
      const err = body.error || JSON.stringify(body);
      if (res.status === 401) {
        this.storage.clear();
        this.displayError(err);
      } else if (res.status === 0) {
        // do nothing
      } else {
        this.displayError(err);
      }
    }
    return throwError(res);
  }

  private displayError(err) {
    if (typeof err == 'object') {
      let errorMsg = '';
      for (let k in err) {
        if (Array.isArray(err)) {
          errorMsg += `${k} ${err.toString}`;
        }
        errorMsg += `${k} ${err[k]}`;
      }
      alert(errorMsg);
    } else {
      alert(err);
    }
  }
}