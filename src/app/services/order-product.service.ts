import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getAllOrderProducts(options: {
    headers: HttpHeaders;
  }): Observable<OrderProduct[]> {
    return this.http.get<OrderProduct[]>(
      'http://localhost:8000/api/order_products'
    );
  }

  sendOrderProduct(products: OrderProduct): Observable<any> {
    return this.http.post(`http://localhost:8000/api/order_products`, products);
  }
}
