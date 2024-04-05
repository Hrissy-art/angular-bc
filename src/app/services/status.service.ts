import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StatusOrder } from '../models/statusOrder';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}

  // getCategories(): Observable<Category[]> {
  //   return this.http.get<any>(this.apiUrl).pipe(
  //     map((response: any) => {
  //       // Vérifier si la réponse est un tableau
  //       if (Array.isArray(response)) {
  //         // Si la réponse est un tableau, renvoyer directement la réponse
  //         return response;
  //       } else {
  //         // Si la réponse est un objet, extraire les catégories du champ 'hydra:member'
  //         return response['hydra:member'];
  //       }
  //     })
  //   );

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
}
