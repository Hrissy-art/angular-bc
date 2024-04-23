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
  // Note vérifier si l'utilisateur est connecté à travers l'existance de token
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
