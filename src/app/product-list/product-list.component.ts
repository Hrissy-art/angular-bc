import { Component, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';
import { AppComponent } from '../app.component';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] | undefined;

  constructor(
    private productService: ProductService,
    private app: AppComponent,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService
      .getProducts(this.app.createCorsToken())
      .subscribe((data: any) => {
        this.products = data['hydra:member'];
      });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  addProduct(): void {
    const newProduct: Product = {
      id: 0,
      product_name: '',
      price: 0,
      category: {
        id: 0,
        category_name: '',
      },
      description: '',
      product_img: '',

      services: [],
      order_product: {
        quantity: 0,
      },
    };

    this.productService
      .addProduct(newProduct, this.app.createCorsToken())
      .subscribe((product: Product) => {
        console.log('New product added:', product);
        // Recharger la liste des produits après l'ajout
        this.loadProducts();
      });
  }

  updateProduct(productId: number, updatedProduct: Product): void {
    this.productService
      .updateProduct(productId, updatedProduct, this.app.createCorsToken())
      .subscribe(() => {
        console.log('Product updated:', productId);
        // Recharger la liste des produits après la mise à jour
        this.loadProducts();
      });
  }

  deleteProduct(productId: number): void {
    this.productService
      .deleteProduct(productId, this.app.createCorsToken())
      .subscribe(() => {
        console.log('Product deleted with ID:', productId);
        // Recharger la liste des produits après la suppression
        this.loadProducts();
      });
  }
  // checkAdminStatus(): void {
  //   this.isAdmin = this.authService.isAdmin(); // Vérifiez si l'utilisateur est un administrateur
  // }
}
