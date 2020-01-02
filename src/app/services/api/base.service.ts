import { HttpService } from '../utils';

export class BaseService {
  public ENDPOINT: string;

  constructor(
    public http: HttpService,
    public url: string) {
    this.ENDPOINT = url
  }

  update(id: any, payload: any): any {
    return this.http.patch(`${this.ENDPOINT}/${id}`, {resource: payload});
  }

  get(id: any): any {
    return this.http.get(`${this.ENDPOINT}/${id}`);
  }

  query(query: any): any {
    return this.http.get(`${this.ENDPOINT}?${this.buildParams(query)}`);
  }

  buildParams(query: any): any {
    let paramsArray = [];
    let payload = '';
    let keys = Object.keys(query);
    for (let item of keys) {
      let value = query[item];
      if (value == null) {
        continue;
      }
      if (Array.isArray(value)) {
        let payloadArr = [];
        for (let val of value) {
          payloadArr.push(`${item}[]=${encodeURIComponent(val)}`);
        }
        payload = payloadArr.join('&');
      } else {
        payload = item + '=' + encodeURIComponent(value);
      }
      paramsArray.push(payload);
    }
    return paramsArray.join('&');
  }

  create(payload: any): any {
    return this.http.post(this.ENDPOINT, {resource: payload});
  }

  destroy(id: any, payload: any): any {
   return this.http.delete(`${this.ENDPOINT}/${id}`);
  }
}