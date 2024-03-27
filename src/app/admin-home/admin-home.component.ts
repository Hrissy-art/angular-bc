import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';
import { HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent implements OnInit {
  products: Product[] | undefined;

  selectedProduct!: Product | null;

  @Output() serviceProduct = new EventEmitter<number>();

  constructor(
    private productService: ProductService,
    private app: AppComponent
  ) {}

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

  deleteProduct(productId: number): void {
    this.productService
      .deleteProduct(productId, this.app.createCorsToken())
      .subscribe(() => {
        console.log('Product deleted with ID:', productId);
        // Recharger la liste des produits après la suppression
        this.loadProducts();
      });
  }
  CloseDetails(): void {
    this.selectedProduct = null;
    console.log('Bouton cliqué');
  }

  onSelectProduct(product: Product): void {
    console.log('Selected producte:', product);

    this.selectedProduct = product;
    if (product.id !== undefined && product.id !== null) {
      localStorage.setItem('selectedProductId', product.id.toString());
    } else {
      console.error('Service ID is undefined or null.');
    }
  }
}
