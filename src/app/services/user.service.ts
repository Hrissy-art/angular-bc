import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getEmployee(): Observable<User> {
    return this.http.get<User>(`http://localhost:8000/api/users`).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError(
          () => new Error('An error occurred while fetching the order details.')
        );
      })
    );
  }

  updateEmployee(employeeId: number, employeeData: any): Observable<any> {
    const url = `http://localhost:8000/api/users/${employeeId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(url, employeeData, { headers }).pipe(
      catchError((error) => {
        console.error('An error occurred while updating employee:', error);
        return throwError(
          new Error('An error occurred while updating employee.')
        );
      })
    );
  }
}
