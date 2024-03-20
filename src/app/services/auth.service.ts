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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userPayload: any;
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userStore: UserStoreService
  ) {
    this.userPayload = this.decodeToken();
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8000/api/login_check', {
      username: email,
      password: password,
    });
  }
  storeToken(token: string): void {
    this.tokenService.setToken(token);
  }
  // vérifier si l'utilisateur se connecter à travers l'existance de token
  isLoggedIn(): boolean {
    return this.tokenService.isLogged();
  }

  isLoggedInObservable(): Observable<boolean> {
    const isLoggedIn = this.isLoggedIn();
    return of(isLoggedIn);
  }

  logout(): void {
    this.tokenService.clearToken();
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.tokenService.getToken()!;
    const decodedToken = jwtHelper.decodeToken(token);
    console.log('Token décodé:', decodedToken);
    return jwtHelper.decodeToken(token);
  }

  // getfullnameFromToken() {
  //   if (this.userPayload) return this.userPayload.name;
  // }

  getRoleFromToken() {
    const userPayload = this.decodeToken();
    return userPayload?.roles || [];
  }

  setUserDetailsInStore() {
    const roles = this.getRoleFromToken();
    console.log('Rôles extraits du token:', roles);
    this.userStore.setRolesFromStore(roles);
  }

  getUserIdFromToken() {
    const userPayload = this.decodeToken();
    return userPayload?.user_id; // Assurez-vous que votre token contient l'ID de l'utilisateur sous la clé 'user_id'
  }
}
