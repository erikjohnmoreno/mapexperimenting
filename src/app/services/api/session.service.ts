import { Injectable } from '@angular/core';
import { HttpService, LocalStorage } from '../utils';
import { environment } from '../../../environments/environment';

const ENDPOINT = `${environment.api_url}`;

@Injectable()
export class SessionService {
  constructor(
    private http: HttpService,
    private localStorage: LocalStorage
  ) {}

  signIn(email, password) {
    var payload = {
      credentials: {
        email: email,
        password: password
      }
    }
    return this.http.post(`${ENDPOINT}/signin`, payload);
  }

  getCurrentUser() {
    return this.localStorage.getObject('currentUser');
  }
}