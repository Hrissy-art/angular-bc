import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token: string | null = null;

  constructor() {}

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    console.log(token);
    return !!token;
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  clearToken(): void {
    this.token = null;

    localStorage.removeItem('token');
  }
}