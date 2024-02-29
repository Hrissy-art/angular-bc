import { Component, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { ProductService } from '../product.service';
import { AppComponent } from '../app.component';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',

})
export class ProductListComponent implements OnInit{


 products: Product[] | undefined;
  
  

  constructor(private productService: ProductService, private app: AppComponent,  private cartService: CartService) {}
  ngOnInit():void {

    this.productService.getProducts(this.app.createCorsToken()).subscribe((data:any) => {
      this.products = data['hydra:member'];

      console.table(this.products)
    });
  }
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}


