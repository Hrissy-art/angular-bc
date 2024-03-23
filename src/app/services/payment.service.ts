import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  getPaymentMethod(options: { headers: HttpHeaders }): Observable<Payment[]> {
    return this.http.get<Payment[]>(`http://localhost:8000/api/payments`).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError(
          () => new Error('An error occurred while fetching the order details.')
        );
      })
    );
  }
}
