import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8000/api/services';

  getServices(options: { headers: HttpHeaders }): Observable<Service[]> {
    return this.http
      .get<Service[]>(`http://localhost:8000/api/services`, options)
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

  getOneService(
    serviceId: number,
    options: { headers: HttpHeaders }
  ): Observable<Service> {
    const url = `${this.apiUrl}/${serviceId}`;
    return this.http.get<Service>(url, options);
  }

  deleteService(
    serviceId: number,
    options: { headers: HttpHeaders }
  ): Observable<void> {
    const url = `${this.apiUrl}/${serviceId}`;
    return this.http.delete<void>(url, options);
  }

  updateService(
    serviceId: number,
    updatedService: Service,
    options: any
  ): Observable<Service> {
    const url = `${this.apiUrl}/${serviceId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<Service>(url, updatedService, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
