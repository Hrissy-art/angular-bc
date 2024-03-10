import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderProduct } from '../models/orderProduct';

@Injectable({
  providedIn: 'root',
})
export class OrderProductService {
  constructor(private http: HttpClient) {}

  getOrderProduct(id: number | undefined): Observable<OrderProduct> {
    return this.http.get<OrderProduct>(
      `http://localhost:8000/api/order_products/${id}`
    );
  }
}
