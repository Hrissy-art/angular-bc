import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StatusOrder } from '../models/statusOrder';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8000/api/status_orders';

  getStatus(options: { headers: HttpHeaders }): Observable<StatusOrder[]> {
    return this.http
      .get<StatusOrder[]>(`http://localhost:8000/api/status_orders`)
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

  deleteStatus(
    statusId: number,
    options: { headers: HttpHeaders }
  ): Observable<void> {
    const url = `${this.apiUrl}/${statusId}`;
    return this.http.delete<void>(url, options);
  }

  updateStatus(
    statusId: number,
    updatedStatus: StatusOrder,
    options: any
  ): Observable<StatusOrder> {
    const url = `${this.apiUrl}/${statusId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<StatusOrder>(url, updatedStatus, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  addStatus(newStatus: StatusOrder): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(url, newStatus);
  }

  getOneStatus(
    statusId: number,
    options: { headers: HttpHeaders }
  ): Observable<StatusOrder> {
    const url = `${this.apiUrl}/${statusId}`;
    return this.http.get<StatusOrder>(url, options);
  }
}
