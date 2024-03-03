// // auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map, tap } from 'rxjs/operators';
// import AuthLogin from './authLogin';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:8000/api';

//   constructor(private http: HttpClient) { }

//   login(credentials: { username: string, password: string }){
//     this.http.post<AuthLogin>(`${this.apiUrl}/login_check`, credentials)
//     .pipe(
//         map(value => value.token)
//         )
//     .subscribe(value => 
//       {
//         localStorage.setItem('token', value);
//       });
//   }
//   getAuthToken(): any | null {
//     const tokenString = localStorage.getItem('token');

//     if (tokenString) {
//       const tokenObject = JSON.parse(tokenString);
//       return tokenObject;
//     }

//     return null;
//   }

//   logout(): Observable<any> {

//     localStorage.removeItem('');
    
//     return this.http.post(`${this.apiUrl}/logout`, {});
//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//       providedIn: 'root'
//     })
//     export class AuthService {
//         constructor(private http: HttpClient ) {}

//         login(email: string, password: string): Observable<any>{
// return this.http.post('${}login_check', {

// });
//         }

//         storeToken(token: string): void {
            
//         }
//     }
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";
import { Token } from "@angular/compiler";

@Injectable({
          providedIn: 'root'
        })
        export class AuthService {

            
            constructor(private http: HttpClient, private tokenService: TokenService ) {} 
            login(email: string, password: string): Observable<any> {
                return this.http.post('http://localhost:8000/api/login_check', {
                    username: email,
                    password: password,
                });
            }
            storeToken (token:string): void {
                this.tokenService.setToken(token);
            }}