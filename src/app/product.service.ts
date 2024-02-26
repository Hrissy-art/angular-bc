import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './models/products';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8000/api/products'; 

  constructor(private http: HttpClient) { }

  getProducts(options: {headers:HttpHeaders}): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, options);
}
getProduct(productId: number, options: { headers: HttpHeaders }): Observable<Product> {
  const url = `${this.apiUrl}/${productId}`; 
  return this.http.get<Product>(url, options);
}

}
