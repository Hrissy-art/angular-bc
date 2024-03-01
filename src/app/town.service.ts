import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TownService {

    constructor(private http: HttpClient) { }
  
    getTowns(): Observable<any> {
      return this.http.get<any>('http://localhost:8000/api/towns'); // Remplacez l'URL par l'URL de votre API pour récupérer les villes
    }
  }
  
