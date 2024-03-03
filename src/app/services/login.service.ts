// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {

//   constructor() { }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  BASE_URL= 'http://localhost:8000/api/clients';

  register(userInfo: User) {
    const body: string = JSON.stringify(userInfo);
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(`${this.BASE_URL}`, body, { headers: headers });
  }
}