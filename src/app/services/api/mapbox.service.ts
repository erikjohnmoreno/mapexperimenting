import { Injectable } from '@angular/core';
import { HttpService } from '../utils/http.util';
import { environment } from '../../../environments/environment';

const ENDPOINT = 'https://api.mapbox.com';

@Injectable()
export class MapboxService {
  
  constructor(
    private http: HttpService
  ) {}

  directions(profile, coordinates) {
    return this.http.get(`${ENDPOINT}/directions/v5/${profile}/${coordinates}?access_token=${environment.mapbox.accessToken}`);
  }

}