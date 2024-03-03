// import { Injectable } from '@angular/core';
// import { Product } from './models/products';
// import { Service } from './models/service';
// import { HttpClient } from '@angular/common/http';
// import { Observable, map, tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   cart: Product[] = [];

//   constructor(private http: HttpClient) { }

//   addToCart(product: Product): Observable<Product> {
//     return this.http.get<Service[]>(`/api/order_products/${product.id}/services`).pipe(
//       tap((services: Service[]) => {
//         product.services = services;
//         this.cart.push(product);
//       }),
//       map(() => product) // Retourne le produit ajouté au panier
//     );
//   }
  

//   getCart(): Product[] {
//     return this.cart;
//   }

//   removeFromCart(index: number): void {
//     this.cart.splice(index, 1);
//   }
// }


import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Product[] = [];


  constructor(private http: HttpClient) { }

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  getCart(): Product[] {
    return this.cart;
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
  }

  
}