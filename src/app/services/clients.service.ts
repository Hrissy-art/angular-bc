import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { Client } from '../models/client';
// import { ClientCreate } from '../models/clientCreate';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}

  getClients(options: { headers: HttpHeaders }): Observable<Client[]> {
    return this.http.get<Client[]>(`http://localhost:8000/api/clients`).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError(
          () => new Error('An error occurred while fetching the order details.')
        );
      })
    );
  }

  getOneClient(
    clientId: number,
    options: { headers: HttpHeaders }
  ): Observable<Client> {
    return this.http
      .get<Client>(`http://localhost:8000/api/clients/${clientId}`)
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

  updateClient(
    clientId: number,
    client: Client,
    options: { headers: HttpHeaders }
  ): Observable<Client> {
    const url = `http://localhost:8000/api/clients/${clientId}`;
    return this.http.put<Client>(url, client, options).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError(
          () => new Error('An error occurred while updating the client.')
        );
      })
    );
  }

  addClient(
    client: Client,
    options: { headers: HttpHeaders }
  ): Observable<Client> {
    return this.http
      .post<Client>(`http://localhost:8000/api/clients`, client, options)
      .pipe(
        catchError((error) => {
          console.error('An error occurred:', error);
          return throwError(
            () => new Error('An error occurred while adding the employee.')
          );
        })
      );
  }

  deleteClient(
    clientId: number,
    options: { headers: HttpHeaders }
  ): Observable<void> {
    const url = `http://localhost:8000/api/clients/${clientId}`;
    return this.http.delete<void>(url, options);
  }
}
