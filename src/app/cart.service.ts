import { Injectable } from '@angular/core';
import { Product } from './models/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Product[] = [];

  constructor() { }

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