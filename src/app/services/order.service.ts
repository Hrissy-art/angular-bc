// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Order } from '../models/order';
// import { OrderProduct } from '../models/orderProduct';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {
//   private apiUrl = 'http://localhost:8000/api/orders';
//   constructor(private http: HttpClient) { }

//   addOrder(order: Order, selectedProducts: OrderProduct[]): Observable<Order> {

//     return this.http.post<Order>(this.apiUrl, { order, selectedProducts });
//   }

// }

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

  // getOrderDetails(orderId: number): Observable<Order> {
  //   return this.http.get<Order>(`http://localhost:8000/api/orders`).pipe(
  //     catchError((error) => {
  //       console.error('An error occurred:', error);
  //       return throwError(
  //         () => new Error('An error occurred while fetching the order details.')
  //       );
  //     })
  //   );
  // }

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

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { OrderInterface, OrderResponse } from '../models/order.interface';

// @Injectable({
//   providedIn: 'root',
// })
// export class OrderService {
//   constructor(private http: HttpClient) {}

//   getOrders(): Observable<OrderResponse> {
//     return this.http.get<OrderResponse>(`${BASE_URL}orders`).pipe(
//       catchError((error) => {
//         console.error('An error occurred:', error);
//         return throwError(
//           () => new Error('An error occurred while fetching the orders.')
//         );
//       })
//     );
//   }

//   chooseDepositDate(orderId: number, depositDate: Date): Observable<any> {
//     const payload = { orderId, depositDate };
//     return this.http.post<any>(`${BASE_URL}orders/deposit-date`, payload).pipe(
//       catchError((error) => {
//         console.error('An error occurred while choosing deposit date:', error);
//         return throwError(
//           () => new Error('An error occurred while choosing deposit date.')
//         );
//       })
//     );
//   }
// }
