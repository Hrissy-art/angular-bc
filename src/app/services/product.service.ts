import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { Observable, catchError, map } from 'rxjs';
import { OrderProductService } from './order-product.service';
import { Material } from '../models/material';
import { Service } from '../models/service';

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

// createProductOrder(productOrder: OrderProductService): Observable<OrderProductService> {
//   return this.http.post<OrderProductService>('/api/product_orders', productOrder);
// }

// getServices(): Observable<Service[]> {
//   return this.http.get<Service[]>('/api/services');
// }

// getMaterials(): Observable<Material[]> {
//   return this.http.get<Material[]>('/api/materials');
// }
}
