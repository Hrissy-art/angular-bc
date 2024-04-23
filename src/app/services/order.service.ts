import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order';
import { OrderProduct } from '../models/orderProduct';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private selectedProducts: OrderProduct[] = [];
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:8000/api/orders').pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError(
          () => new Error('An error occurred while fetching the order details.')
        );
      })
    );
  }

  setSelectedProducts(products: OrderProduct[]): void {
    this.selectedProducts = products;
  }
  createOrder(order: Order): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/orders`, order);
  }

  getOneOrder(
    orderId: number,
    options: { headers: HttpHeaders }
  ): Observable<Order> {
    const url = `${`http://localhost:8000/api/orders`}/${orderId}`;
    return this.http.get<Order>(url, options);
  }

  updateOrderStatus(orderId: number, orderData: any): Observable<any> {
    const url = `http://localhost:8000/api/orders/${orderId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(url, orderData, { headers }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  updateEmployee(employeeId: number, employeeData: any): Observable<any> {
    const url = `http://localhost:8000/api/orders/${employeeId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put(url, employeeData, { headers }).pipe(
      catchError((error) => {
        console.error('An error occurred while updating employee:', error);
        return throwError(
          new Error('An error occurred while updating employee.')
        );
      })
    );
  }
}
