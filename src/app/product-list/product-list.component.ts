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
  selectedItem!: Product | null;

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
      // order_product: {
      //   quantity: 0,
      // },
    };
  }

  updateProduct(productId: number, updatedProduct: Product): void {
    this.productService
      .updateProduct(productId, updatedProduct, this.app.createCorsToken())
      .subscribe(() => {
        console.log('Product updated:', productId);
        this.loadProducts();
      });
  }

  CloseDetails(): void {
    this.selectedItem = null;
    console.log('Bouton cliqué');
  }

  onSelectProduct(product: Product): void {
    this.selectedItem = product;
    console.log('Item selected:', this.selectedItem);
  }

  poursuivreCommande() {
    alert(`Votre produit à été ajouté au panier `);
  }

  isSelectionValid(): boolean {
    return (
      this.cartService.getSelectedServices().length > 0 ||
      this.cartService.getSelectedMaterials().length > 0
    );
  }
}
