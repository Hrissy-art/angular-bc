import { Component, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent implements OnInit {
  products: Product[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // Appel de la méthode getProducts() avec un objet vide pour l'argument options
    this.productService
      .getProducts({ headers: new HttpHeaders() })
      .subscribe((data: any) => {
        this.products = data['hydra:member'];
        console.log(data);
      });
  }
}
