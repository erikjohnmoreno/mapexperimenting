import { Injectable } from '@angular/core';
import { HttpService } from '../utils';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

const ENDPOINT = `${environment.api_url}/api/courses`;

@Injectable()
export class CourseService extends BaseService {
  constructor(
    public http: HttpService
  ) {
    super(http, ENDPOINT);
  }
}