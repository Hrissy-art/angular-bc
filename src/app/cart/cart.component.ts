import { Component, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.cart = this.cartService.getCart(); // Mettez à jour le panier après la suppression d'un produit
  }
  getTotalPrice(): number {
    return this.cart.reduce((total, product) => total + product.price, 0);
  }
}