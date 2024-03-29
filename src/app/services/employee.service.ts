import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(options: { headers: HttpHeaders }): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`http://localhost:8000/api/employees`)
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          return throwError(
            () =>
              new Error('An error occurred while fetching the order details.')
          );
        })
      );
  }

  getOneEmployee(
    employeeId: number,
    options: { headers: HttpHeaders }
  ): Observable<Employee> {
    return this.http
      .get<Employee>(`http://localhost:8000/api/employees/${employeeId}`)
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          return throwError(
            () =>
              new Error(
                'An error occurred while fetching the employee details.'
              )
          );
        })
      );
  }

  updateEmployee(
    employeeId: number,
    employee: Employee,
    options: { headers: HttpHeaders }
  ): Observable<Employee> {
    const url = `http://localhost:8000/api/employees/${employeeId}`;
    return this.http.put<Employee>(url, employee, options).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError(
          () => new Error('An error occurred while updating the employee.')
        );
      })
    );
  }
}
