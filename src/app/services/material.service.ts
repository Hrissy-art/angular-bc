import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from '../models/material';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8000/api/materials';

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
  getOneMaterial(
    materialId: number,
    options: { headers: HttpHeaders }
  ): Observable<Material> {
    const url = `${this.apiUrl}/${materialId}`;
    return this.http.get<Material>(url, options);
  }

  deleteMaterial(
    materialId: number,
    options: { headers: HttpHeaders }
  ): Observable<void> {
    const url = `${this.apiUrl}/${materialId}`;
    return this.http.delete<void>(url, options);
  }

  updateMaterial(
    materialId: number,
    updatedMaterial: Material,
    options: any
  ): Observable<Material> {
    const url = `${this.apiUrl}/${materialId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<Material>(url, updatedMaterial, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
