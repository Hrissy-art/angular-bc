import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from '../models/material';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private http: HttpClient) {}

  getMaterials(options: { headers: HttpHeaders }): Observable<Material[]> {
    return this.http
      .get<Material[]>(`http://localhost:8000/api/materials`, options)
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
