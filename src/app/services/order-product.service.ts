import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderProduct } from '../models/orderProduct';

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {

  constructor(private http: HttpClient) { }

  getOrderProduct(id: number): Observable<OrderProduct> {
    return this.http.get<OrderProduct>(`/api/order_products/${id}`);
  }
}