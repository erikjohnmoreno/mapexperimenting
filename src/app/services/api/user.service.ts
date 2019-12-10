import { Injectable } from '@angular/core';
import { HttpService } from '../utils/http.util';
import { environment } from '../../../environments/environment';

const ENDPOINT = `${environment.api_url}/api/users`;

@Injectable()
export class UserService {
  constructor(
    private http: HttpService
  ) {}
}